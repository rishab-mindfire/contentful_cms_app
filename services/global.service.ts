import { apiClient } from './api-client';
import { GlobalData } from '@/utils/types';

export const globalService = {
  getData: async (): Promise<GlobalData> => {
    // Tell the client what to expect
    const response = await apiClient.get<{ data: GlobalData }>('/globle');
    return response.data;
  },
};
