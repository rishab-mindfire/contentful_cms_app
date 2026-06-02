import { lazy, Suspense } from 'react';
import { PageBlock, BlockComponentMap } from '@/utils/types';

// Lazy load components
const Hero = lazy(() => import('@/components/landing-blocks/Hero'));
const SectionHeading = lazy(() => import('@/components/landing-blocks/SectionHeading'));
const CardGrid = lazy(() => import('@/components/landing-blocks/CardGrid'));
const Markdown = lazy(() => import('@/components/landing-blocks/Markdown'));
const PersonCard = lazy(() => import('@/components/landing-blocks/PersonCard'));
const Faqs = lazy(() => import('@/components/landing-blocks/Faqs'));
const ContentWithImage = lazy(() => import('@/components/landing-blocks/ContentWithImage'));

// Mapping object using your specific BlockComponentMap type
const componentMap: BlockComponentMap = {
  'blocks.hero': Hero,
  'blocks.section-heading': SectionHeading,
  'blocks.card-grid': CardGrid,
  'blocks.markdown': Markdown,
  'blocks.person-card': PersonCard,
  'blocks.faqs': Faqs,
  'blocks.component-content-with-image': ContentWithImage,
} as BlockComponentMap;

interface Props {
  block: PageBlock;
}

export default function BlockRenderer({ block }: Props) {
  // Extract the specific component based on the discriminator string
  const Component = componentMap[block.__component];

  if (!Component) {
    console.warn(`Component not found for: ${block.__component}`);
    return null;
  }

  const BlockComponent = Component as React.ComponentType<typeof block>;

  return (
    <Suspense fallback={<div className="animate-pulse h-20 w-full" aria-hidden="true" />}>
      <BlockComponent {...block} />
    </Suspense>
  );
}
