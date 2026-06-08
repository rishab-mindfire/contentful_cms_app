import BlockRenderer from '@/lib/rendeLogic/BlockRenderer';
import { landingPageService } from '@/services/landingPage.service';
import { PageBlock } from '@/utils/types';

export default async function LandingPage() {
  //  Call the service landing page to get blocks data
  const response = await landingPageService.getData();
  const blocks = response?.data?.blocks || [];
  if (blocks.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center p-12 my-16 max-w-md mx-auto bg-gray-50 border border-dashed border-gray-200 rounded-2xl"
        role="status"
        aria-live="polite"
      >
        <h1 className="text-xl font-semibold text-gray-900 mb-2">No Section added !</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          We couldn't load the landing section now. Please refresh the page or try again later.
        </p>
      </div>
    );
  }
  return (
    <main className="min-h-screen">
      {blocks.map((block: PageBlock, index) => (
        <BlockRenderer key={`${block.__component}-${block.id || 'no-id'}-${index}`} block={block} />
      ))}
    </main>
  );
}
