import CardGrid from '@/components/landing-blocks/CardGrid';
import ContentWithImage from '@/components/landing-blocks/ContentWithImage';
import Faqs from '@/components/landing-blocks/Faqs';
import Hero from '@/components/landing-blocks/Hero';
import Markdown from '@/components/landing-blocks/Markdown';
import PersonCard from '@/components/landing-blocks/PersonCard';
import SectionHeading from '@/components/landing-blocks/SectionHeading';
import { BlockComponentMap, PageBlock } from '@/utils/types';

// This maps the __component string to the correct component
const componentMap: BlockComponentMap = {
  'blocks.hero': Hero,
  'blocks.section-heading': SectionHeading,
  'blocks.card-grid': CardGrid,
  'blocks.markdown': Markdown,
  'blocks.person-card': PersonCard,
  'blocks.faqs': Faqs,
  'blocks.component-content-with-image': ContentWithImage,
};

interface Props {
  block: PageBlock;
}
export default function BlockRenderer({ block }: Props) {
  //  grab the component
  const Component = componentMap[block.__component];

  if (!Component) return null;

  if (block.__component === 'blocks.hero') {
    return <Hero {...block} />;
  }
  if (block.__component === 'blocks.section-heading') {
    return <SectionHeading {...block} />;
  }
  if (block.__component === 'blocks.card-grid') {
    return <CardGrid {...block} />;
  }
  if (block.__component === 'blocks.person-card') {
    return <PersonCard {...block} />;
  }

  return null;
}
