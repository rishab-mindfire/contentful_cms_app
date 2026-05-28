import { apiClient } from './api-client';

export const globalService = {
  // Fetch header, footer,  metadata
  getGlobalData: async () => {
    return await apiClient.get('/globle');
  },
};
