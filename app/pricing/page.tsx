import { PricingSection } from '@/components/pricing-blocks/PricingSection';
import { priceService } from '@/services/pricing.service';

export default async function PricingPage() {
  const response = await priceService.getData();

  // response exists AND the data array has content
  if (!response?.data || response.data.length === 0) {
    return <div>No pricing data found.</div>;
  }
  const pricingItem = response.data[0];

  return <PricingSection data={pricingItem} />;
}
