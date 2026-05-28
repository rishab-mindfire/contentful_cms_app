'use client';

import { HeaderType, SessionType } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header({
  session,
  headerData,
}: {
  session: SessionType;
  headerData: HeaderType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="relative w-8 h-8">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${headerData.logo.image.url}`}
                alt={headerData.logo.lable}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              {headerData.logo.lable}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {session &&
              headerData?.navItems?.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${isActive(item.href) ? 'text-white bg-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {item.lable}
                </Link>
              ))}

            {!session && (
              <Link
                href={'/auth'}
                className="px-3 py-1 rounded-md text-sm font-medium text-black bg-gray-100"
              >
                sign in
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-gray-50 border-b">
          {headerData?.navItems?.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 rounded-md"
            >
              {item.lable}
            </Link>
          ))}
          {!session && (
            <Link
              href={'/auth'}
              className="px-3 py-1 rounded-md text-sm font-medium text-black bg-gray-100"
            >
              sign in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
