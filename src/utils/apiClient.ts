const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return res.json();
};