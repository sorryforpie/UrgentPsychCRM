import DashboardCard from '../components/DashboardCard';

const cards = [
  { href: '/matters', title: 'Matters', description: 'Manage active matters' },
  { href: '/patients', title: 'Patients', description: 'View patient directory' },
  { href: '/calendar', title: 'Calendar', description: 'Schedule and events' },
  { href: '/billing', title: 'Billing', description: 'Track time and invoices' },
  { href: '/documents', title: 'Documents', description: 'Organize files' },
  { href: '/referrals', title: 'Referrals', description: 'Manage referrals' },
  { href: '/resources', title: 'Resources', description: 'Community resources' },
  { href: '/settings', title: 'Settings', description: 'Configure application' },
];

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <DashboardCard key={card.href} {...card} />
        ))}
      </div>
    </main>
  );
}
