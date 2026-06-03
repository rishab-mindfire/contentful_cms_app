import { SectionHeadingBlock } from '@/utils/types';

// Extended interface internally to accept a dynamic heading level if needed for perfect semantic mapping
interface ExtendedSectionHeadingBlock extends SectionHeadingBlock {
  level?: 'h1' | 'h2';
}

export default function SectionHeading({
  heading,
  subHeading,
  level = 'h2',
}: ExtendedSectionHeadingBlock) {
  // Dynamically switch heading elements based on page context (Home page hero section vs inner section)
  const HeadingTag = level;

  return (
    <header className="py-12 md:py-16 px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
      {/* Main Heading Landmark */}
      <HeadingTag className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
        {heading}
      </HeadingTag>

      {/* Decorative Accent Bar */}
      <div className="w-24 h-1.5 bg-indigo-600 rounded-full mb-6" aria-hidden="true" />

      {/* Subheading */}
      {subHeading && (
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">{subHeading}</p>
      )}
    </header>
  );
}
