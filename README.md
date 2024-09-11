# Townhall Frontend

This repository contains the frontend of the Townhall application, built using Next.js with the App Router, TypeScript, React Query, and Sass. The frontend communicates with a Django backend to provide a seamless experience for users.

# Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Contributing](#contributing)
- [Resources](#resources)

# Tech Stack

- **Framework**: Next.js with React
- **Language**: JavaScript
- **Styling**: Sass (SCSS)
- **State Management**: Redux and React Query
- **Form Handling**: React Hook Form
- **Data Fetching**: React Query and Next.js built-in API routes

# Getting Started

### Prerequisites

- Node.js (>= 14.x)
- `pnpm` package manager (recommended)
- A running instance of the backend API

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:AtriaCoop/townhall-frontend.git
   cd townhall-frontend
   ```
2. **Install dependencies:**

   ```bash
    pnpm install
   ```
3. **Set up environment variables:**
  
    Create a `.env.local` file in the root of the project and add:
   ```bash
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/
   ```
4. **Run the development server:**

   ```bash
    pnpm dev
   ```
   The application should now be running on http://localhost:3000.

# API Integration

The frontend communicates with the backend through Axios, which is configured in `axiosConfig.js`. All API calls are done using Redux Toolkit's `createAsyncThunk` to handle asynchronous data fetching with proper state management (loading, success, and failure).

### Example API Call:
To fetch the list of volunteers:

   ```js
   import { fetchVolunteers } from '../store/volunteerSlice';
   import { useDispatch } from 'react-redux';

   const dispatch = useDispatch();

   dispatch(fetchVolunteers())
   .then(response => console.log(response))
   .catch(error => console.error(error));
   ```

   Ensure that the backend is running and the `NEXT_PUBLIC_API_BASE_URL` is correctly configured in your `.env.local file`.
### Axios Config:
The Axios instance is pre-configured in `axiosConfig.js` to handle base URL and other options. Use this config to simplify all API calls across the app.

# Development Workflow

### Adding New Pages
- Add new pages in the `src/` directory. Use `page.jsx` for defining routes and `layout.jsx` for page-specific layouts.
- Ensure that global components like headers and footers are added in `src/layout.jsx`.
### Adding Components
- Reusable UI components should be added to the `src/components` directory.
- Keep components small and focused. If a component grows too complex, consider breaking it into smaller sub-components.
### Styling
- Global styles are located in `src/styles/globals.scss`.
- Component-specific styles are located in `.module.scss` files.
- Keep components small and focused. If a component grows too complex, consider breaking it into smaller sub-components.
### State Management
- Redux Toolkit is used for global state management, with slices located in the `store/` directory.
- Use Redux's `createAsyncThunk` for async API calls (e.g., fetching data from the backend).

### Writing API Thunks
To fetch volunteers or a specific volunteer by ID:
```js
  import { fetchVolunteers, fetchVolunteerById } from './volunteerSlice';

  dispatch(fetchVolunteers()); // Fetch all volunteers

  dispatch(fetchVolunteerById(1)); // Fetch a specific volunteer by ID
```
These thunks automatically handle loading, success, and error states in the Redux store.
# Testing
We use Jest and React Testing Library for testing components and Redux state logic.
### Running Tests
```bash
pnpm test
```
or
```bash
pnpm test:coverage
```
Coverage will provide a detailed report on which parts of the codebase are covered by tests.

Ideally your tests should cover most of the code you write. It doesn't have to be 100%. But it should thoroughly cover the most important aspects of the code though.
### Writing Component Tests
Tests for React components should be placed in the same folder as the component and follow the .test.js convention. For example, for VolunteerCard.js:
```javascript
  import { render, screen } from '@testing-library/react';
  import VolunteerCard from './VolunteerCard';

  test('renders volunteer name', () => {
    const volunteer = { first_name: 'John', last_name: 'Doe' };
    render(<VolunteerCard volunteer={volunteer} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
```
### Testing Redux Thunks
To test async thunks like fetchVolunteers, you can mock API responses using axios-mock-adapter:
```js
  import MockAdapter from 'axios-mock-adapter';
  import axios from 'axios';
  import { fetchVolunteers } from './volunteerSlice';
  import store from './index';

  const mock = new MockAdapter(axios);

  test('fetchVolunteers fulfilled', async () => {
    const volunteersData = [{ id: 1, first_name: 'John', last_name: 'Doe' }];
    mock.onGet('/volunteers/').reply(200, volunteersData);

    await store.dispatch(fetchVolunteers());

    const state = store.getState().volunteer;
    expect(state.volunteers).toEqual(volunteersData);
    expect(state.status).toBe('succeeded');
  });
```
# Contributing
1. **Assign Yourself a Jira Ticket**
- Find an Open Ticket: Look for a ticket that is ready to be worked on, usually in the "To Do" or "Backlog" column.
- Assign the Ticket to Yourself: Move the ticket to the "In Progress" column or assign it to yourself to indicate that you're working on it.
2. **Review the Ticket Details**
- Read the Ticket Description: Understand the requirements, acceptance criteria, and any additional details provided in the ticket.
- Check for Attachments or Links: Sometimes tickets include design mockups, specifications, or links to relevant documents. Make sure you review these.
3. **Start Development**
- Ensure your local development environment is ready based on the task. This might involve checking out the appropriate branch or ensuring dependencies are installed.
- Create a new Git branch based on the Jira ticket. Use a branch naming convention that relates to the ticket ID for easy tracking.
  ```bash
  git checkout -b feature/JIRA-123-implement-feature-name
  ```
4. **Work on the Task**
- Develop the Feature: Implement the changes required by the Jira ticket. This may involve writing code, modifying existing code, and ensuring that your changes meet the acceptance criteria.
- Once you've made progress, commit your changes locally. Make sure to include the Jira ticket ID in your commit message for traceability.
  ```bash
  git add .
  git commit -m "AFE-123: Implemented feature X with Y changes"
  ```
5. **Test Your Changes**
- Run Local Tests: Ensure that your changes work as expected by running any relevant tests or manually testing the feature.
- 
- Push your branch to the remote repository and open a pull request (PR) on GitHub.
6. **Complete the Task**
- Merge the PR: After the code review is complete and any feedback has been addressed, merge the PR into the main branch.
- Close the Jira Ticket: Once the work is deployed or verified, mark the Jira ticket as "Done" or "Closed" depending on your team's process.

# Code Style
- Follow the ESLint rules defined in `.eslintrc.js`.
- Ensure code is formatted according to Prettier rules before committing.

# Resources

## General Documentation
React Redux Documentation: https://react-redux.js.org/

Axios Documentation: https://axios-http.com/docs/intro
## API Integration
**Redux Toolkit Async Thunks:**
- Useful for understanding how to handle asynchronous logic using createAsyncThunk: [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)

**Next.js API Routes:**
- Explanation on how to work with API routes in Next.js [here](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- Creating API routes in Next: [here](https://nextjs.org/learn-pages-router/basics/api-routes/creating-api-routes)

## Testing
**Jest Documentation:**
- Provides comprehensive information on writing unit tests using Jest: [here](https://jestjs.io/docs/getting-started)

**React Testing Library Documentation**
- Explains how to write React component tests using the React Testing Library: [here](https://www.npmjs.com/package/axios-mock-adapter)

**Redux Toolkit Testing Guide**
- Guidance on testing Redux async thunks and slices: [here](https://redux.js.org/usage/writing-tests)

**Mocking Axios in Tests**
- Learn how to mock Axios requests for testing purposes: [here](https://www.npmjs.com/package/axios-mock-adapter)