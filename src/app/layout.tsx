import '../styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importing React Query's core utilities for managing server state.
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  /**
   * RootLayout component wraps all pages and layouts in the application.
   * It uses the QueryClientProvider to make the QueryClient instance
   * available throughout the app, allowing any component to use React Query.
   *
   * @param {children} React.ReactNode - The child components, representing the active page content.
   */
  return (
    <QueryClientProvider client={queryClient}> {/* Providing the QueryClient instance to the entire app via React Query's context provider. */}
      <html lang="en">
        <body>
          <header>
            {/* Add your header component here */}
          </header>
          <main>{children}</main>
          <footer>
            {/* Add your footer component here */}
          </footer>
        </body>
      </html>
    </QueryClientProvider>
  );
}