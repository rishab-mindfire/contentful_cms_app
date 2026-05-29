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
  get: async (path: string, customOptions: NextRequestInit = {}) => {
    const url = `${BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;

    const options: NextRequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
      },
      ...customOptions, // Allow overriding cache/revalidate
    };

    const res = await fetch(url, options);
    // ... rest of error handling
    return (await res.json()).data;
  },
};
