import { handleApiError } from '@/utils/errorHandler';

// 1. Define the interface to allow custom 'query' property
interface ApiRequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean>;
}

export const apiClient = {
  get: async <T>(path: string, options: ApiRequestOptions = {}): Promise<T | null> => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '');

    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');
    }

    // 2. Build the URL object correctly
    const url = new URL(`${baseUrl}/api${path.startsWith('/') ? path : `/${path}`}`);

    // 3. Append query parameters properly (this encodes [ ] for you)
    if (options.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    try {
      // 4. Use url.toString() here!
      const res = await fetch(url.toString(), {
        method: 'GET',
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.STRAPI_API_TOKEN
            ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
            : {}),
          ...options.headers,
        },
      });

      if (!res.ok) {
        // Optional: handle specific non-200 status codes here
        return null;
      }
      return await res.json();
    } catch (error) {
      handleApiError('API Connection Failed:', error);
      return null;
    }
  },
};
