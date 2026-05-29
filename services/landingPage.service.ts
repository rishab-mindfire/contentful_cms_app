// src/services/landingPage.service.ts
import { LandingPageData } from '@/utils/types';
import { apiClient } from './api-client';

export const landingPageService = {
  // No more TS errors!
  getData: async (): Promise<LandingPageData> => {
    // T is now LandingPageData
    return await apiClient.get<LandingPageData>('/landing-page');
  },
};
