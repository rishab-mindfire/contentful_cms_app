import { getFullUrl } from '@/utils/helperFunctions';
import { HeroBlock } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ heading, text, links, image }: HeroBlock) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">{heading}</h1>
          <p className="text-xl text-gray-600 mb-8">{text}</p>
          <div className="flex gap-4">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={link.type === 'PRIMARY' ? 'btn-primary' : 'btn-secondary'}
              >
                {link.lable}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative aspect-video">
          <Image
            src={image?.url ? getFullUrl(image?.url) : '/default.png'}
            alt={image?.alternativeText || heading}
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
