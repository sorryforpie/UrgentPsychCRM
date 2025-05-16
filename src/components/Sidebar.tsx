import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/matters', label: 'Matters' },
  { href: '/patients', label: 'Patients' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/billing', label: 'Billing' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <aside className={`h-full bg-white shadow-md ${open ? 'w-56' : 'w-20'} transition-all`}>
      <button
        className="p-4 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        ≡
      </button>
      <nav className="mt-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block px-4 py-2 hover:bg-gray-100 rounded">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
