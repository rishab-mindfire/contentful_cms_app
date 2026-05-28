import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Header from '@/components/Header';
import { GlobalData, SessionType } from '@/utils/types';
import { Footer } from '@/components/Footer';
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
  const session: SessionType | null = await auth.api.getSession({
    headers: await headers(),
  });
  const globalData: GlobalData = await globalService.getGlobalData();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header session={session!} headerData={globalData.header} />
        <div className="min-h-screen"> {children}</div>
        <Footer footerData={globalData.footer} />
      </body>
    </html>
  );
}
