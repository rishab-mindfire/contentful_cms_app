import { LandingPageData } from '@/utils/types';
import { apiClient } from './api-client';
import { handleApiError } from '@/utils/errorHandler';

export const landingPageService = {
  // get data for landing page content
  getData: async (): Promise<LandingPageData | null> => {
    try {
      const data = await apiClient.get<LandingPageData>('/landing-page');
      return data;
    } catch (error) {
      // 'LandingPageService' as the context to identify where it failed
      handleApiError('LandingPageService.getData', error, 'Could not fetch landing page data');
      return null;
    }
  },
};
