'use client';

import { useState } from 'react';
import Link from 'next/link';
import patients from '@/data/patients';

export default function PatientsPage() {
  const [query, setQuery] = useState('');

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Patient Directory</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search patients..."
        className="w-full md:w-1/3 p-2 border rounded"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="text-left bg-gray-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.avatar} alt="" className="h-8 w-8 rounded-full" />
                  <Link
                    href={`/patients/${p.id}`}
                    className="font-medium text-accent hover:underline"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">{p.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
