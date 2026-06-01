import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GlobalProvider } from './GlobalContext';
import { globalService } from '@/services/global.service';

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
  // Fetch Session and Global Data in parallel
  const [sessionRes, globalRes] = await Promise.allSettled([
    auth.api.getSession({ headers: await headers() }),
    globalService.getData(),
  ]);

  // Safely extract results
  const session = sessionRes.status === 'fulfilled' ? sessionRes.value : null;
  const globalData = globalRes.status === 'fulfilled' ? globalRes.value : null;

  // show a warning or just provide an empty default
  const hasDbConnection = session !== null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
        cz-shortcut-listen="true"
      >
        {!hasDbConnection && (
          <div className="p-4 bg-red-100 text-red-800 text-center">
            Database connection currently unavailable.
          </div>
        )}
        <GlobalProvider data={globalData} session={session}>
          <Header />
          <div className="min-h-screen"> {children}</div>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
