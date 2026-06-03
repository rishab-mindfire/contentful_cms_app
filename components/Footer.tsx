'use client';
import Link from 'next/link';
import Image from 'next/image';
import { getFullUrl } from '@/utils/helperFunctions';
import { FooterType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { globalService } from '@/services/global.service';

export const Footer = () => {
  const [footerData, setFooterData] = useState<FooterType | null>(null);

  useEffect(() => {
    globalService
      .getData()
      .then((data) => {
        if (data?.footer) {
          setFooterData(data.footer);
        }
      })
      .catch((err) => console.error('Could not fetch global data', err));
  }, []);

  if (!footerData) return null;

  // Destructure footer
  const { text = '', logo, socialLinks = [] } = footerData;

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo Section */}
          {logo && (
            <Link href={logo.href ?? '#'} className="shrink-0" aria-label="Go to homepage">
              <Image
                src={logo.image?.url ? getFullUrl(logo.image.url) : '/default.png'}
                alt={logo.lable ?? 'logo image'}
                width={120}
                height={40}
                className="h-16 w-auto object-contain"
              />
            </Link>
          )}

          {/* Text and Socials */}
          <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right max-w-md">
            <p className="text-gray-400 text-md leading-relaxed">{text}</p>

            <nav aria-label="Social media profiles">
              <ul className="flex space-x-4" role="list">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href?.startsWith('http') ? link.href : `https://${link.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gray-800 p-2 rounded-full"
                    >
                      <Image
                        src={link.image?.url ? getFullUrl(link.image.url) : '/default.png'}
                        alt={link.lable ?? 'Social'}
                        width={20}
                        height={20}
                        className="w-8 h-8 object-contain"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
