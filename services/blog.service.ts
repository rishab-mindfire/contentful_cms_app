import { ArticlesApiResponse, SingleArticleApiResponse } from '@/utils/types';
import { apiClient } from './api-client';
import { handleApiError } from '@/utils/errorHandler';

const REVALIDATE_TIME = 3660;
const POSTS_PER_PAGE = 5;

/**
 * Fetches a paginated list of blog articles
 */
export async function getArticles(
  page: number = 1,
  pageSize: number = POSTS_PER_PAGE,
): Promise<ArticlesApiResponse> {
  const data = await apiClient.get<ArticlesApiResponse>(
    `/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      next: { revalidate: REVALIDATE_TIME },
    },
  );

  if (!data) throw new Error('Failed to fetch articles');
  return data;
}

/**
 * Fetches a single article by its unique documentId
 */
export async function getArticleByDocumentId(
  documentId: string,
): Promise<SingleArticleApiResponse | null> {
  try {
    const response = await apiClient.get<SingleArticleApiResponse>(
      `/articles/${documentId}?populate=*`,
      {
        next: { revalidate: REVALIDATE_TIME },
      },
    );

    return response?.data ? response : null;
  } catch (error) {
    handleApiError(`Error fetching article: ${documentId}`, error);
    return null;
  }
}
