'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFullUrl } from '@/utils/helperFunctions';
import { globalService } from '@/services/global.service';
import { HeaderType } from '@/utils/types';

export default function Header() {
  const [headerData, setHeaderData] = useState<HeaderType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // header  data
  useEffect(() => {
    globalService
      .getData()
      .then((data) => {
        if (data) {
          setHeaderData(data.header);
        }
      })
      .catch((err) => console.error('Could not fetch global data', err));
  }, []);

  // Accessible IDs for mobile disclosures
  const mobileMenuId = 'mobile-navigation-drawer';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand Anchor */}
          <Link
            href="/"
            className="flex items-center space-x-2 shrink-0 rounded-lg outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
            aria-label="Go to homepage"
          >
            <div className="relative w-8 h-8">
              <Image
                src={headerData ? getFullUrl(headerData?.logo?.image?.url) : '/default.png'}
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              {headerData?.logo.lable}
            </span>
          </Link>

          {/* Desktop Nav Landmark */}
          <nav className="hidden md:flex items-center space-x-4" aria-label="Main Navigation">
            {headerData?.navItems?.map((item) => {
              const current = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600 ${
                    current ? 'text-white bg-indigo-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.lable}
                </Link>
              );
            })}

            <Link
              href={'/auth'}
              className="px-3 py-1 rounded-md text-sm font-medium text-black bg-gray-100 transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
            >
              sign in
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={mobileMenuId}
            aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isOpen ? (
                //'X' icon when open
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Standard hamburger lines when closed
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer Container */}
      {isOpen && (
        <nav
          id={mobileMenuId}
          className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-gray-50 border-b"
          aria-label="Mobile Navigation"
        >
          {headerData?.navItems?.map((item) => {
            const current = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={current ? 'page' : undefined}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                  current ? 'text-white bg-indigo-700' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.lable}
              </Link>
            );
          })}

          <Link
            href={'/auth'}
            className="block px-3 py-2 rounded-md text-base font-medium text-black bg-gray-100 text-center transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            sign in
          </Link>
        </nav>
      )}
    </header>
  );
}
