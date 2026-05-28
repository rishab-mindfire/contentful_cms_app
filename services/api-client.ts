/**
 * main client for api call
 *
 */
type NextRequestInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export const apiClient = {
  get: async (path: string) => {
    // Construct URL (ensuring no double slashes)
    const url = `${BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;

    const options: NextRequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //  include Authorization if the token exists
        ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
      },
    };

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        // You can log errors or throw custom errors based on status
        console.error(`API Fetch Error: ${res.status} - ${res.statusText}`);
        throw new Error(`Failed to fetch: ${path}`);
      }

      const response = await res.json();
      return response.data;
    } catch (error) {
      console.error('API Client Error:', error);
      throw error;
    }
  },
};
