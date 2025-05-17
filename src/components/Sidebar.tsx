'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Home,
  Folder,
  Users,
  Calendar,
  DollarSign,
  Settings as SettingsIcon,
} from 'lucide-react';

const links = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/matters', label: 'Matters', icon: Folder },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/billing', label: 'Billing', icon: DollarSign },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <aside className={`h-full bg-white shadow-md ${open ? 'w-56' : 'w-20'} transition-all`}>
      <button
        className="p-4 focus:outline-none text-accent"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        ≡
      </button>
      <nav className="mt-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded"
              >
                <link.icon className="h-5 w-5 text-accent" />
                {open && <span>{link.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
