'use client';

import { SessionType } from '@/utils/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ session }: { session: SessionType }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* company logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M541.9 191.9L541.9 448L478.5 484.5L478.5 228.7L320 137.1L161.4 228.7L161.8 484.6L98.5 448L98.5 192.1L320.4 64L541.9 191.9zM351.8 484.5L320.2 502.9L288.4 484.7L288.4 228.7L225.1 265.3L225.2 521.2L320.1 576.1L415.2 521.2L415.2 265.2L351.8 228.6L351.8 484.5z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Contentful cms</span>
          </Link>
          {/* navigation links */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>

            <Link
              href="/our-team"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/our-team')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Our team
            </Link>

            <Link
              href="/about-us"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about-us')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About us
            </Link>

            {session && (
              <Link
                href="/dashboard"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {!session && (
              <Link
                href="/auth"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
