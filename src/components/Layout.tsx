import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  title?: ReactNode;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full bg-white shadow px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-accent">UrgentPsychCRM</span>
          {title && <div className="text-lg font-medium">{title}</div>}
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-background">{children}</main>
      </div>
    </div>
  );
}
