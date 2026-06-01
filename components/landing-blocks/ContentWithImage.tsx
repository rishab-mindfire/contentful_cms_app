import Image from 'next/image';
import { ContentWithImageBlock } from '@/utils/types';
import { getFullUrl } from '@/utils/helperFunctions';

export default function ContentWithImage({ heading, image, reversed }: ContentWithImageBlock) {
  return (
    <section
      className={`py-12 flex flex-col md:flex-row gap-8 ${reversed ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4 text-center">{heading}</h2>
        <div className="text-gray-600"></div>
      </div>
      <div className="flex-1 relative aspect-video">
        <Image src={getFullUrl(image.url)} alt={heading} fill className="rounded-lg object-cover" />
      </div>
    </section>
  );
}
