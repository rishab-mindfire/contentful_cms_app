import { ArticlesApiResponse, SingleArticleApiResponse } from '@/utils/types';
import { apiClient } from './api-client';

const REVALIDATE_TIME = 60;
const POSTS_PER_PAGE = 2;

/**
 * Fetches a paginated list of blog articles from Strapi
 */
export async function getArticles(page: number = 1): Promise<ArticlesApiResponse> {
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

/**
 * Fetches a single article by its unique slug string
 */
export async function getArticleByDocumentId(
  documentId: string,
): Promise<SingleArticleApiResponse | null> {
  try {
    // Strapi v5 Endpoint: /articles/vds8c5hwvv91jxi78k2tjws7?populate=*
    const response = await apiClient.get<SingleArticleApiResponse>(
      `/articles/${documentId}?populate=*`,
      {
        next: { revalidate: REVALIDATE_TIME },
      },
    );

    // If no data returned, return null so the page can handle a 404
    if (!response || !response.data) {
      return null;
    }

    return response;
  } catch (error) {
    console.error(`Failed to fetch article with documentId: ${documentId}`, error);
    throw new Error('Strapi CMS server error during document fetch');
  }
}
