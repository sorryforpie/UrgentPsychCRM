'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function AnimatedMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <main key={pathname} className="flex-1 p-6 bg-background animate-fade-in">
      {children}
    </main>
  );
}
