import { apiClient } from './api-client';
import { GlobalData } from '@/utils/types';

export const globalService = {
  getData: async (): Promise<GlobalData | null> => {
    try {
      const response = await apiClient.get<{ data: GlobalData }>('/globle');

      // If response is null return null
      if (!response) return null;

      return response.data;
    } catch (error) {
      // Catch network errors
      console.error('Service Error:', error);
      return null;
    }
  },
};
