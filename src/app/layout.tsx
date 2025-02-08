import '@/global.scss';
import Providers from '@/components/Providers';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Adam Delaney',
  description: 'Personal website of Adam Delaney',
  manifest: '/manifest.json',
  icons: {
    icon: '/skate.png',
    shortcut: '/skate.png',
    apple: '/skate.png',
  },
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Adam Delaney',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="theme-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
