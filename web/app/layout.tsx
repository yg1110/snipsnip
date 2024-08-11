import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import ReactQueryProvider from '@/state/reactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.snipsnip.site'),
  title: {
    default: 'SnipSnip - 순간을 기록하는 북마크 플랫폼',
    template: '%s | SnipSnip - 순간을 기록하는 북마크 플랫폼',
  },
  description:
    '북마크를 빠르고 쉽게 필요한 부분만 따로 관리하고 싶다면 SnipSnip에서 시작하세요!',
  keywords: ['북마크', 'SnipSnip', '순간', '기록'],
  openGraph: {
    type: 'website',
    url: 'https://www.snipsnip.site',
    title: 'SnipSnip - 순간을 기록하는 북마크 플랫폼',
    description:
      '북마크를 빠르고 쉽게 필요한 부분만 따로 관리하고 싶다면 SnipSnip에서 시작하세요!',
    siteName: 'SnipSnip - 순간을 기록하는 북마크 플랫폼',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
