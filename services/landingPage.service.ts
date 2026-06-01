import { LandingPageData } from '@/utils/types';
import { apiClient } from './api-client';

export const landingPageService = {
  // get data for landing page contentent
  getData: async (): Promise<LandingPageData | null> => {
    return await apiClient.get<LandingPageData>('/landing-page');
  },
};
