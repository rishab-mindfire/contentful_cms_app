'use client';
import { useGlobal } from '@/app/GlobalContext';
import Link from 'next/link';
import Image from 'next/image';
import { getFullUrl } from '@/utils/urlCreator';

export const Footer = () => {
  const { globalData } = useGlobal();

  if (!globalData?.footer) return null;
  const { text, logo, socialLinks } = globalData.footer;

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo */}
          <Link href={logo.href} className="shrink-0">
            <Image
              src={getFullUrl(logo.image.url)}
              alt={logo.lable}
              width={120}
              height={40}
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/*  Text and Socials links */}
          <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right max-w-md">
            <p className="text-gray-400 text-md leading-relaxed">{text}</p>

            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href.startsWith('http') ? link.href : `https://${link.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                >
                  <Image
                    src={getFullUrl(link.image.url)}
                    alt={link.lable}
                    width={20}
                    height={20}
                    className="w-8 h-8"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
