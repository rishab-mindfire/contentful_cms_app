// Helper to build URL for images
const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || '';
export const getFullUrl = (url: string) => (url?.startsWith('http') ? url : `${STRAPI_BASE}${url}`);
