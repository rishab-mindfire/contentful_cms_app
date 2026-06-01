import { vi, describe, it, expect, Mock } from 'vitest';
import { globalService } from './global.service';
import { apiClient } from './api-client';

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
});
