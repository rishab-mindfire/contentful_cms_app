//  main client for api call (interceptor)

export const apiClient = {
  get: async <T>(path: string): Promise<T | null> => {
    try {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api${path.startsWith('/') ? path : `/${path}`}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.STRAPI_API_TOKEN
            ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
            : {}),
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
