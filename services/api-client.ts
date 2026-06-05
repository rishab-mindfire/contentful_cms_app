import { handleApiError } from '@/utils/errorHandler';

// Define the interface to allow custom 'query' property
interface ApiRequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean>;
}
// main interceptor for API calls
export const apiClient = {
  get: async <T>(path: string, options: ApiRequestOptions = {}): Promise<T | null> => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '');

    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');
    }

    // Build the URL object correctly
    const url = new URL(`${baseUrl}/api${path.startsWith('/') ? path : `/${path}`}`);

    // Append query parameters properly
    if (options.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    try {
      // Use url.toString() to parse my url in string
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
        // handle specific non-200 status codes
        return null;
      }
      return await res.json();
    } catch (error) {
      handleApiError('API Connection Failed:', error);
      return null;
    }
  },
};
