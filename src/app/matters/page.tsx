'use client';
import { useState } from 'react';
import Link from 'next/link';
import { sampleMatters, Matter } from '@/data/sampleMatters';

export default function MattersPage() {
  const [query, setQuery] = useState('');

  const filtered = sampleMatters.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.patient.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Matters</h1>
      <div>
        <input
          type="text"
          placeholder="Filter matters..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-64 p-2 border rounded shadow-inner"
        />
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Matter
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Patient
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((m: Matter) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <Link
                    href={`/matters/${m.id}`}
                    className="text-accent hover:underline"
                  >
                    {m.title}
                  </Link>
                </td>
                <td className="px-4 py-2">{m.patient}</td>
                <td className="px-4 py-2">{m.status}</td>
                <td className="px-4 py-2">{m.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
