/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GlobalProvider } from './GlobalContext';
import { globalService } from '@/services/global.service';
import SystemStatus from '@/components/error/SystemStatus';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Headless CMS',
  description: 'A headless cms tool for website',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;
  let isDbDown = false;
  let globalData = null;

  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    isDbDown = true;
  }

  if (!isDbDown) {
    try {
      globalData = await globalService.getData();
    } catch (error) {
      isDbDown = true;
    }
  }

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isDbDown ? (
          <main id="main-content">
            <SystemStatus />
          </main>
        ) : (
          <GlobalProvider data={globalData} session={session}>
            <a href="#main-content" className="sr-only focus:not-sr-only">
              Skip to main
            </a>
            <Header />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </GlobalProvider>
        )}
      </body>
    </html>
  );
}
