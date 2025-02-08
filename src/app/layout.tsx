import './globals.css';
// Update this import to point to your actual Providers component location
import Providers from '../components/Providers'; 

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="theme-light">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
