import { apiClient } from './api-client';
import { PricingResponse } from '@/utils/types';

export const priceService = {
  getData: async (): Promise<PricingResponse | null> => {
    try {
      const response = await apiClient.get<PricingResponse>('/pricings');
      // returns data
      return response;
    } catch (error) {
      console.error('Service Error:', error);
      return null;
    }
  },
};
