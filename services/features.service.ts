import { ArticlesApiResponse } from '@/utils/types';
import { apiClient } from './api-client';

const REVALIDATE_TIME = 60;

export async function getArticles(): Promise<ArticlesApiResponse> {
  const data = await apiClient.get<ArticlesApiResponse>(`/articles`, {
    next: { revalidate: REVALIDATE_TIME }, // Triggers ISR configuration
  });

  if (!data) {
    throw new Error('Failed to fetch articles from Strapi CMS server');
  }

  return data;
}
