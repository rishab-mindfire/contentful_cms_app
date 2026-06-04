import { handleApiError } from '@/utils/errorHandler';

// main api interceptor for Strapi API calls
export const apiClient = {
  get: async <T>(path: string, options: RequestInit = {}): Promise<T | null> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
      const url = `${baseUrl}/api${path.startsWith('/') ? path : `/${path}`}`;

      const res = await fetch(url, {
        method: 'GET',
        ...options, // Spread incoming Next.js tags, caching configurations, or ISR intervals
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.STRAPI_API_TOKEN
            ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
            : {}),
          ...options.headers,
        },
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      handleApiError('API Connection Failed:', error);
      return null;
    }
  },
};
