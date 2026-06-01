// @/utils/api-client.ts

export const apiClient = {
  get: async <T>(path: string, options: RequestInit = {}): Promise<T | null> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
      const url = `${baseUrl}/api${path.startsWith('/') ? path : `/${path}`}`;

      const res = await fetch(url, {
        method: 'GET',
        ...options, // Spread incoming Next.js tags, caching configurations, or ISR intervals here
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.STRAPI_API_TOKEN
            ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
            : {}),
          ...options.headers, // Merge user custom headers if they exist
        },
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('API Connection Failed:', error);
      return null;
    }
  },
};
