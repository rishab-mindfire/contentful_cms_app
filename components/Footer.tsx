'use client';
import { useGlobal } from '@/app/GlobalContext';
import Link from 'next/link';
import Image from 'next/image';
import { getFullUrl } from '@/utils/urlCreator';

export const Footer = () => {
  const { globalData } = useGlobal();

  // If data is null
  if (!globalData?.footer) return null;
  const { text, logo, socialLinks } = globalData.footer;

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        {/* Logo Section */}
        <Link href={logo.href} className="flex items-center">
          <Image
            src={getFullUrl(logo.image.url)}
            alt={logo.lable}
            width={50}
            height={50}
            unoptimized
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Text Section */}
        <p className="text-gray-400 text-md">{text}</p>

        {/* Social Links */}
        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href.startsWith('http') ? link.href : `https://${link.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Image
                src={getFullUrl(link.image.url)}
                alt={link.lable}
                width={24}
                height={24}
                className="w-10 h-10"
                unoptimized
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
