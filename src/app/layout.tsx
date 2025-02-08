import '@/global.scss';
import Providers from '@/components/Providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adam Delaney',
  description: 'Personal website of Adam Delaney',
  icons: {
    icon: '/skate.png',
    shortcut: '/skate.png',
    apple: '/skate.png',
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
