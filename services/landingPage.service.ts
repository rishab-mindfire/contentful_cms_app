import { LandingPageData } from '@/utils/types';
import { apiClient } from './api-client';

export const landingPageService = {
  // get data
  getData: async (): Promise<LandingPageData | null> => {
    return await apiClient.get<LandingPageData>('/landing-page');
  },
};
