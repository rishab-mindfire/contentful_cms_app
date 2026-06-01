import { vi, describe, it, expect, Mock } from 'vitest';
import { globalService } from './global.service';
import { apiClient } from './api-client';
import { getArticles } from './blog.service';

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
    const mockResponse = {
      data: [{ id: 1, attributes: { title: 'Test Article' } }],
      meta: { pagination: { page: 1, pageSize: 2, pageCount: 1, total: 1 } },
    };

    getMock.mockResolvedValue(mockResponse);

    const result = await getArticles(1);

    expect(getMock).toHaveBeenCalledWith(
      '/articles?populate=*&pagination[page]=1&pagination[pageSize]=2',
      { next: { revalidate: 60 } },
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when the API returns no data', async () => {
    // Simulate API returning null or undefined
    getMock.mockResolvedValue(null);

    await expect(getArticles(1)).rejects.toThrow('Failed to fetch articles from Strapi CMS server');
  });

  it('should throw an error when the API call fails (network error)', async () => {
    getMock.mockRejectedValue(new Error('Network error'));

    await expect(getArticles(1)).rejects.toThrow('Network error');
  });
});
