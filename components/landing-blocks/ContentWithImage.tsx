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
    // main section
    <section
      className={`relative py-16 md:py-24 px-6 lg:px-16 xl:px-32 flex flex-col md:flex-row gap-12 items-center ${reversed ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Content Side */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{heading}</h2>
        <div className="w-20 h-1 bg-indigo-600 rounded-full mb-8" />
        <div className="prose prose-lg text-gray-600">
          <Markdown content={content} />
        </div>
      </div>

      {/* Image Side */}
      <div className="flex-1 w-full relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
        <Image src={getFullUrl(image.url)} alt={heading} fill className="object-cover" />
      </div>

      {/* The Bottom Ribbon */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />
    </section>
  );
}
