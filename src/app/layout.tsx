import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Layout from '../components/Layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'UrgentPsychCRM',
  description: 'Premium CRM for psychiatrists',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
