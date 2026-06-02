import Image from 'next/image';
import { PersonCardBlock } from '@/utils/types';
import { getFullUrl } from '@/utils/helperFunctions';

export default function PersonCard({ personName, personJob, aboutPerson, image }: PersonCardBlock) {
  return (
    <section className="py-12 px-4 w-full flex justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-gray-50 shadow-md">
          <Image src={getFullUrl(image.url)} alt={personName} fill className="object-cover" />
        </div>

        {/* Content Container  */}
        <div className="flex flex-col text-center md:text-left">
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{personName}</h3>
          <p className="text-indigo-600 font-semibold text-lg mb-4">{personJob}</p>
          <p className="text-gray-600 text-lg italic leading-relaxed">"{aboutPerson}"</p>
        </div>
      </div>
    </section>
  );
}
