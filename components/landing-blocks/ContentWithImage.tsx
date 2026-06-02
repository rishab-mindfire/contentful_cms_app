import Image from 'next/image';
import { ContentWithImageBlock } from '@/utils/types';
import { getFullUrl } from '@/utils/helperFunctions';
import Markdown from './Markdown';

export default function ContentWithImage({
  heading,
  image,
  reversed,
  content,
}: ContentWithImageBlock) {
  return (
    <section
      className={`relative py-16 md:py-24 px-6 lg:px-16 xl:px-32 flex flex-col md:flex-row gap-12 items-center ${
        reversed ? 'md:flex-row-reverse' : ''
      }`}
      // Dynamically assigns an accessible landmark name using the block's unique heading
      aria-label={heading || 'Information panel'}
    >
      {/* Content Side */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{heading}</h2>

        {/* Decorative Divider Line - Hidden from screen readers */}
        <div className="w-20 h-1 bg-indigo-600 rounded-full mb-8" aria-hidden="true" />

        {/* Rich Text Boundary Group */}
        <div className="prose prose-lg text-gray-600 w-full">
          <Markdown content={content} />
        </div>
      </div>

      {/* Image Side */}
      <div className="flex-1 w-full relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
        <Image
          src={getFullUrl(image?.url)}
          // If the image is purely editorial/presentational alongside the identical headline,
          // setting this descriptive context keeps screen-readers uncluttered.
          alt={heading ? `Illustration for ${heading}` : 'Informational graphic'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Cosmetic Bottom Ribbon Accent Line - Hidden from screen readers */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" aria-hidden="true" />
    </section>
  );
}
