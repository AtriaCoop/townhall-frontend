import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import VolunteerProfile from './VolunteerProfile';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

// Mock the Next.js useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mock = new MockAdapter(axios);

describe('VolunteerProfile Component', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // Mock the router for each test case
    useRouter.mockReturnValue({
      query: { id: '1' },
    });

    // Suppress console.error during tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    mock.reset();

    // Restore console.error after each test
    consoleErrorSpy.mockRestore();
  });

  it('renders volunteer details correctly', async () => {
    const volunteerData = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      password: "pbkdf2_sha256$150000$...", // Hashed password
      is_active: true,
      gender: "M", // "M" for Male
    };

    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, volunteerData);

    render(<VolunteerProfile />);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/johndoe@example.com/)).toBeInTheDocument();
    });
  });

  it('displays error message if volunteer data fails to load', async () => {
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(404);

    render(<VolunteerProfile />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load volunteer details/)).toBeInTheDocument();
    });
  });

  it('handles missing volunteer fields gracefully', async () => {
    // Simulate missing fields in volunteer data
    const volunteerData = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: ""
    };

    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, volunteerData);

    render(<VolunteerProfile />);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      // Ensure the email label is rendered, but no email is present
      const emailElement = screen.getByText(/Email:/);
      expect(emailElement).toBeInTheDocument();
      expect(emailElement).toHaveTextContent('Email:');
    });
  });

  it('shows loading state during a network delay', async () => {
    jest.useFakeTimers(); // Enable fake timers for simulating delay

    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, { first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com' }]);
        }, 2000); // 2-second delay
      });
    });

    render(<VolunteerProfile />);

    // Check if loading indicator is displayed
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();

    // Fast-forward the timers
    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    });

    jest.useRealTimers(); // Reset timers
  });
});
