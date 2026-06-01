// @/services/articles.ts
import { ArticlesApiResponse } from '@/utils/types';
import { apiClient } from './api-client';

const REVALIDATE_TIME = 60;
const POSTS_PER_PAGE = 2;

export async function getArticles(page: number = 1): Promise<ArticlesApiResponse> {
  // Strapi pagination standard: pagination[page] and pagination[pageSize]
  const data = await apiClient.get<ArticlesApiResponse>(
    `/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${POSTS_PER_PAGE}`,
    {
      next: { revalidate: REVALIDATE_TIME },
    },
  );

  if (!data) {
    throw new Error('Failed to fetch articles from Strapi CMS server');
  }

  return data;
}
