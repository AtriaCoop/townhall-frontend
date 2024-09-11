import React from 'react';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import VolunteerProfile from './VolunteerProfile';
import { act } from 'react';
import { useRouter } from 'next/router';

// Mock the Next.js useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mock = new MockAdapter(axios);

describe('VolunteerProfile', () => {
  const mockVolunteer = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    skills: ['Public Speaking', 'Event Management'],
    interests: ['Photography'],
    contributions: [{ projectName: 'Project A', community: 'Community X', role: 'Coordinator' }],
    projects: ['Project A'],
    followers: [{ id: 1, name: 'Follower 1', picture: '/default-avatar.png' }],
  };

  beforeEach(() => {
    // ARRANGE: Mock the router and reset axios mock before each test
    useRouter.mockReturnValue({ query: { id: '1' } });
    mock.reset();
  });

  it('renders the profile with volunteer data', async () => {
    // ARRANGE: Mock a successful API response with volunteer data
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, mockVolunteer);

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ASSERT: Check that the profile is rendered with the correct volunteer details
    expect(await screen.findByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByText(/Public Speaking/)).toBeInTheDocument();
  });

  it('displays loading state while fetching volunteer data', async () => {
    // ARRANGE: Mock a delayed API response to simulate a loading state
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, mockVolunteer]);
        }, 2000);
      });
    });

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ASSERT: Verify the loading message is displayed
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('handles error state when volunteer data fails to load', async () => {
    // ARRANGE: Mock an error response from the API
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(500);

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ASSERT: Verify the error message is displayed
    expect(await screen.findByText(/Failed to load volunteer details/)).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  it('displays the correct tab content', async () => {
    // ARRANGE: Mock a successful API response with volunteer data
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, mockVolunteer);

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ASSERT: Check that the default tab 'Skills' is displayed with the correct content
    expect(await screen.findByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByText(/Public Speaking/)).toBeInTheDocument();

    // ACT: Simulate switching to the 'Interests' tab
    fireEvent.click(screen.getByText('Interests'));

    // ASSERT: Verify the 'Interests' tab content is displayed
    expect(screen.getByText(/Photography/i)).toBeInTheDocument();

    // ACT: Simulate switching to the 'Contributions' tab
    fireEvent.click(screen.getByText('Contributions'));

    // ASSERT: Verify the 'Contributions' tab content is displayed
    expect(screen.getByText(/Project A/i)).toBeInTheDocument();

    // ACT: Simulate switching to the 'Projects' tab
    fireEvent.click(screen.getByText('Projects'));

    // ASSERT: Verify the 'Projects' tab content is displayed
    expect(screen.getByText(/Project A/i)).toBeInTheDocument();
  });

  it('handles long strings in volunteer data', async () => {
    // ARRANGE: Mock a volunteer with long strings in the data
    const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.';
    const mockVolunteerWithLongStrings = {
      ...mockVolunteer,
      first_name: longString,
      last_name: longString,
      skills: [longString],
    };
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, mockVolunteerWithLongStrings);

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ASSERT: Verify the long strings are correctly rendered
    expect(await screen.findByText(longString)).toBeInTheDocument();
  });

  it('renders follower section correctly', async () => {
    // ARRANGE: Mock a volunteer with followers
    const mockVolunteerWithFollowers = {
      ...mockVolunteer,
      followers: [{ id: 1, name: 'Follower 1', picture: '/default-avatar.png' }],
    };
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, mockVolunteerWithFollowers);

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ASSERT: Verify that the followers section is correctly rendered
    expect(await screen.findByText('Follower 1')).toBeInTheDocument();
  });

  it('renders volunteer details and switches tabs correctly', async () => {
    // ARRANGE: Mock a successful API response with volunteer data
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, mockVolunteer);

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ASSERT: Verify the default 'Skills' tab is correctly rendered
    expect(await screen.findByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByText(/Public Speaking/i)).toBeInTheDocument();

    // ACT: Simulate switching to the 'Interests' tab
    fireEvent.click(screen.getByText('Interests'));

    // ASSERT: Verify the 'Interests' tab content is displayed
    expect(screen.getByText(/Photography/i)).toBeInTheDocument();

    // ACT: Simulate switching to the 'Contributions' tab
    fireEvent.click(screen.getByText('Contributions'));

    // ASSERT: Verify the 'Contributions' tab content is displayed
    expect(screen.getByText(/Project A/i)).toBeInTheDocument();

    // ACT: Simulate switching to the 'Projects' tab
    fireEvent.click(screen.getByText('Projects'));

    // ASSERT: Verify the 'Projects' tab content is displayed
    expect(screen.getByText(/Project A/i)).toBeInTheDocument();
  });

  it('handles empty skills, interests, contributions, and projects', async () => {
    // ARRANGE: Mock a volunteer with empty fields
    const volunteerWithEmptyFields = {
      ...mockVolunteer,
      skills: [],
      interests: [],
      contributions: [],
      projects: [],
    };
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, volunteerWithEmptyFields);

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ACT: Simulate clicking the Skills tab using 'getByTestId' to avoid ambiguity
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('skills-tab'));
    });
    // ASSERT: Verify the 'Skills' section displays 'No skills available'
    expect(await screen.findByTestId('skills-section')).toHaveTextContent('No skills available');

    // ACT: Simulate clicking the Interests tab
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('interests-tab'));
    });
    // ASSERT: Verify the 'Interests' section displays 'No interests available'
    expect(await screen.findByTestId('interests-section')).toHaveTextContent('No interests available');

    // ACT: Simulate clicking the Contributions tab
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('contributions-tab'));
    });
    // ASSERT: Verify the 'Contributions' section displays 'No contributions available'
    expect(await screen.findByTestId('contributions-section')).toHaveTextContent('No contributions available');

    // ACT: Simulate clicking the Projects tab
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('projects-tab'));
    });
    // ASSERT: Verify the 'Projects' section displays 'No projects available'
    expect(await screen.findByTestId('projects-section')).toHaveTextContent('No projects available');
  });

  it('handles partial volunteer data', async () => {
    // ARRANGE: Mock a volunteer with partial data
    const partialVolunteerData = {
      id: 1,
      first_name: 'John',
      skills: ['Public Speaking'],
      projects: ['Project A'],
    };
    mock.onGet('http://localhost:8000/volunteer/?id=1').reply(200, partialVolunteerData);

    // ACT: Render the VolunteerProfile component
    await act(async () => {
      render(<VolunteerProfile />);
    });

    // ASSERT: Verify the default 'Skills' tab is rendered
    expect(await screen.findByText('John')).toBeInTheDocument();
    expect(screen.getByText('Public Speaking')).toBeInTheDocument();

    // ACT: Simulate clicking the Interests tab before asserting
    await waitFor(() => {
      fireEvent.click(screen.getByText('Interests'));
    });
    // ASSERT: Verify the 'Interests' section displays 'No interests available'
    expect(await screen.findByTestId('interests-section')).toHaveTextContent('No interests available');

    // ACT: Simulate clicking the Projects tab
    await waitFor(() => {
      fireEvent.click(screen.getByText('Projects'));
    });
    // ASSERT: Verify the 'Projects' section displays 'Project A'
    expect(screen.getByText('Project A')).toBeInTheDocument();
  });
});
