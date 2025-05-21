import prisma from '@/lib/prisma';

const appointments = [
  { id: 1, patient: 'John Doe', time: 'Jun 14, 10:00 AM' },
  { id: 2, patient: 'Jane Smith', time: 'Jun 15, 2:00 PM' },
  { id: 3, patient: 'Alex Johnson', time: 'Jun 18, 9:30 AM' },
];

export default async function Home() {
  const newPatients = await prisma.patient.findMany({ take: 3, orderBy: { id: 'desc' } });
  const recentMatters = await prisma.matter.findMany({ take: 3, orderBy: { id: 'desc' } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="font-medium mb-4">Upcoming Appointments</h2>
          <ul className="space-y-2 text-sm">
            {appointments.map((a) => (
              <li key={a.id} className="flex justify-between">
                <span>{a.patient}</span>
                <span className="text-gray-500">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="font-medium mb-4">Recent Matters</h2>
          <ul className="space-y-2 text-sm">
            {recentMatters.map((m) => (
              <li key={m.id} className="flex justify-between">
                <span>{m.title}</span>
                <span className="text-gray-500">{m.status}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="font-medium mb-4">New Patients</h2>
          <ul className="space-y-2 text-sm">
            {newPatients.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.name}</span>
                <span className="text-gray-500">{p.phone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
