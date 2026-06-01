import { apiClient } from './api-client';
import { GlobalData } from '@/utils/types';

export const globalService = {
  // get data for gobal data
  getData: async (): Promise<GlobalData | null> => {
    const response = await apiClient.get<{ data: GlobalData }>('/globle');
    if (!response) return null;
    return response.data;
  },
};
