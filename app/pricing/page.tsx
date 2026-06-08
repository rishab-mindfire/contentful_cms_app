import { PricingSection } from '@/components/pricing-blocks/PricingSection';
import { priceService } from '@/services/pricing.service';

export default async function PricingPage() {
  const response = await priceService.getData();

  // Unified check for missing response, missing data, or empty array
  if (!response?.data || response.data.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center p-12 my-16 max-w-md mx-auto bg-gray-50 border border-dashed border-gray-200 rounded-2xl"
        role="status"
        aria-live="polite"
      >
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Pricing Unavailable</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          We couldn't load the pricing plans right now. Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  const pricingItem = response.data[0];

  return <PricingSection data={pricingItem} />;
}
