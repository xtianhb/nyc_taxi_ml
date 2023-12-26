import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './ui/Navbar';
import Cover from './ui/Cover';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NYC Taxi Fare and Trip Duration Prediction',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        href: '/favicon.ico',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <Cover />
        {children}
      </body>
    </html>
  );
}
