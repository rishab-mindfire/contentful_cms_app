import { vi, describe, it, expect, Mock } from 'vitest';
import { globalService } from './global.service';
import { apiClient } from './api-client';
import { getArticles } from './blog.service';
import { mockResponseArticle } from '@/utils/mocks/mocks';

// Mock the API client
vi.mock('./api-client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

// Cast to Mock
const getMock = apiClient.get as Mock;

describe('globalService Resiliency', () => {
  it('should return data when API call succeeds', async () => {
    const mockData = { data: { Title: 'Real Data' } };
    getMock.mockResolvedValue(mockData);

    const result = await globalService.getData();
    expect(result).toEqual(mockData.data);
  });

  it('should return null when API call fails', async () => {
    // Simulate a network failure
    getMock.mockRejectedValueOnce(new Error('Network error'));

    const result = await globalService.getData();
    expect(result).toBeNull();
  });

  //articles blog api testing
  it('should return articles when the API call succeeds', async () => {
    getMock.mockResolvedValue(mockResponseArticle);

    const result = await getArticles(1);

    expect(getMock).toHaveBeenCalledWith(
      '/articles?populate=*&pagination[page]=1&pagination[pageSize]=5',
      { next: { revalidate: 10 } },
    );
    expect(result).toEqual(mockResponseArticle);
  });

  it('should throw an error when the API returns no data', async () => {
    // Simulate API returning null or undefined
    getMock.mockResolvedValue(null);

    await expect(getArticles(1)).rejects.toThrow('Failed to fetch articles');
  });

  it('should throw an error when the API call fails (network error)', async () => {
    getMock.mockRejectedValue(new Error('Network error'));

    await expect(getArticles(1)).rejects.toThrow('Network error');
  });
});
