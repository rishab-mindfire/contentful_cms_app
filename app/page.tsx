import BlockRenderer from '@/lib/rendeLogic/BlockRenderer';
import { landingPageService } from '@/services/landingPage.service';
import { PageBlock } from '@/utils/types';

export default async function LandingPage() {
  //  Call the service once and await it
  const response = await landingPageService.getData();
  const blocks = response?.data?.blocks || [];
  return (
    <main className="min-h-screen">
      {blocks.map((block: PageBlock) => (
        <BlockRenderer key={block.__component} block={block} />
      ))}
    </main>
  );
}
