import { apiClient } from './api-client';

export const globalService = {
  // Fetch header and footer
  getData: async () => {
    return await apiClient.get('/globle');
  },
};
