# Townhall Frontend

This repository contains the frontend of the Townhall application, built using Next.js with the App Router, TypeScript, React Query, and Sass. The frontend communicates with a Django backend to provide a seamless experience for users.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)

## Tech Stack

- **Framework**: Next.js with the App Router
- **Language**: TypeScript
- **Styling**: Sass (SCSS)
- **State Management**: React Query
- **Form Handling**: React Hook Form
- **Data Fetching**: Next.js built-in API routes

## Getting Started

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
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```
4. **Run the development server:**

   ```bash
    pnpm dev
   ```
   The application should now be running on http://localhost:3000.

## API Integration

The frontend communicates with the backend through the API client located in `src/utils/apiClient.ts`. Ensure that the backend is running and the `NEXT_PUBLIC_API_BASE_URL` is correctly configured in your .env.local file.

### Example API Call:

   ```typescript
   import { fetcher } from '@/utils/apiClient';

    fetcher('/volunteers')
      .then(data => console.log(data))
      .catch(error => console.error(error));
   ```

## Development Workflow

### Adding New Pages
- Add new pages in the `src/app` directory. Use `page.tsx` for defining routes and `layout.tsx` for page-specific layouts.
- Ensure that global components like headers and footers are added in `src/app/layout.tsx`.
### Adding Components
- Reusable UI components should be added to the `src/components` directory.
- Keep components small and focused. If a component grows too complex, consider breaking it into smaller sub-components.
### Styling
- Global styles are located in `src/styles/globals.scss`.
- Keep components small and focused. If a component grows too complex, consider breaking it into smaller sub-components.
### State Management
- Use React Query for fetching and caching server data.
- For local component state, use the React `useState` and `useReducer` hooks.

## Contributing
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
  git commit -m "JIRA-123: Implemented feature X with Y changes"
  ```
5. **Test Your Changes**
- Run Local Tests: Ensure that your changes work as expected by running any relevant tests or manually testing the feature.
- Push your branch to the remote repository and open a pull request (PR) on GitHub.
6. **Complete the Task**
- Merge the PR: After the code review is complete and any feedback has been addressed, merge the PR into the main branch.
- Close the Jira Ticket: Once the work is deployed or verified, mark the Jira ticket as "Done" or "Closed" depending on your team's process.

## Code Style
- Follow the ESLint rules defined in `.eslintrc.js`.
- Ensure code is formatted according to Prettier rules before committing.