import './globals.css';
import { ReactNode } from 'react';
import Layout from '../components/Layout';

export const metadata = {
  title: 'UrgentPsychCRM',
  description: 'Premium CRM for psychiatrists',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
