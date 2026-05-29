import { landingPageService } from '@/services/landingPage.service';
import { LinkType } from '@/utils/types';
import { getFullUrl } from '@/utils/urlCreator';
import Image from 'next/image';
import Link from 'next/link';
export default async function landingPage() {
  const landingPageData = await landingPageService.getData();
  const hero = landingPageData.blocks[0];

  return (
    <div className="min-h-screen from-blue-50 to-indigo-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="text-center md:text-left mt-2">
            <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">{hero.text}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {hero.links.map((link: LinkType) => (
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

          {/* Right Side: Image */}
          <div className="relative w-full aspect-video md:aspect-square">
            <Image
              src={getFullUrl(hero.image.url)}
              alt={hero.image.alternativeText || hero.heading}
              fill
              unoptimized
              className="object-contain rounded-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
