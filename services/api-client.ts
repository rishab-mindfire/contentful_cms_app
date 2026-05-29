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
  // Add <T> here to make the function generic
  get: async <T>(path: string, customOptions: NextRequestInit = {}): Promise<T> => {
    const url = `${BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;

    const options: NextRequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
      },
      ...customOptions,
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    return (await res.json()) as T;
  },
};
