import { apiClient } from './api-client';

export const landingPageService = {
  // Fetch header and footer
  getData: async () => {
    return await apiClient.get('/landing-page');
  },
};
