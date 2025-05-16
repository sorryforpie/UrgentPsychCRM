import Link from 'next/link';

interface DashboardCardProps {
  title: string;
  description?: string;
  href?: string;
}

export default function DashboardCard({ title, description, href }: DashboardCardProps) {
  const content = (
    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg">
        {content}
      </Link>
    );
  }
  return content;
}
