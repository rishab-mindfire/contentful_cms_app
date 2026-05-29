import Image from 'next/image';
import { getFullUrl } from '@/utils/urlCreator';
import { PersonCardBlock } from '@/utils/types';

export default function PersonCard({ personName, personJob, aboutPerson, image }: PersonCardBlock) {
  return (
    <section className="py-12 flex justify-center">
      <div className="max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-full">
          <Image src={getFullUrl(image.url)} alt={personName} fill className="object-cover" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{personName}</h3>
        <p className="text-indigo-600 font-medium mb-3">{personJob}</p>
        <p className="text-gray-600 italic leading-relaxed">"{aboutPerson}"</p>
      </div>
    </section>
  );
}
