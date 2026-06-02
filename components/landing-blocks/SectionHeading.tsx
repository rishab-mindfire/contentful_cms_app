import { SectionHeadingBlock } from '@/utils/types';

export default function SectionHeading({ heading, subHeading }: SectionHeadingBlock) {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
        {heading}
      </h2>

      {/* Decorative Accent Bar */}
      <div className="w-60 h-1.5 bg-indigo-600 rounded-full mb-6" />

      {/* Subheading */}
      {subHeading && (
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">{subHeading}</p>
      )}
    </section>
  );
}
