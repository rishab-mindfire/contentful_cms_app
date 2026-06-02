import Image from 'next/image';
import { PersonCardBlock } from '@/utils/types';
import { getFullUrl } from '@/utils/helperFunctions';

export default function PersonCard({ personName, personJob, aboutPerson, image }: PersonCardBlock) {
  return (
    <aside
      className="py-12 px-4 w-full flex justify-center bg-transparent"
      aria-label={`Profile card for ${personName}`}
    >
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
        {/* Avatar Image Wrapper */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-gray-50 shadow-md shrink-0 bg-gray-50">
          <Image
            src={getFullUrl(image?.url)}
            alt={personName ? `${personName} profile avatar` : 'Team member snapshot'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 256px"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">{personName}</h2>

          <p className="text-indigo-600 font-semibold text-lg mb-4">{personJob}</p>

          <blockquote className="text-gray-600 text-lg italic leading-relaxed border-l-0 md:border-l-2 md:border-gray-100 md:pl-4">
            <span className="sr-only">Biography quote: </span>"{aboutPerson}"
          </blockquote>
        </div>
      </div>
    </aside>
  );
}
