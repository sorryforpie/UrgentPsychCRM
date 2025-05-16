import { notFound } from 'next/navigation';
import patients from '@/data/patients';

interface Params {
  params: { id: string };
}

export default function PatientProfile({ params }: Params) {
  const patient = patients.find((p) => p.id === Number(params.id));

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={patient!.avatar} alt="" className="h-16 w-16 rounded-full" />
        <div>
          <h1 className="text-2xl font-semibold">{patient!.name}</h1>
          <p className="text-gray-500">{patient!.email}</p>
          <p className="text-gray-500">{patient!.phone}</p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium mb-2">Timeline</h2>
        <ul className="space-y-2">
          {patient!.timeline.map((event, i) => (
            <li
              key={i}
              className="p-4 bg-white rounded shadow flex justify-between"
            >
              <span>{event.description}</span>
              <span className="text-gray-500">{event.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
