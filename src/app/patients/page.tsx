'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TimelineEvent {
  date: string;
  description: string;
}

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'Active' | 'Inactive';
  lastVisit: string;
  timeline: TimelineEvent[];
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [afterFilter, setAfterFilter] = useState('');

  useEffect(() => {
    fetch('/api/patients')
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch(() => setPatients([]));
  }, []);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) &&
    (statusFilter === '' || p.status === statusFilter) &&
    (afterFilter === '' || new Date(p.lastVisit) >= new Date(afterFilter))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Patient Directory</h1>
        <Link
          href="/patients/new"
          className="px-3 py-2 rounded bg-accent text-white hover:bg-indigo-700"
        >
          New Patient
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patients..."
          className="w-full md:w-1/3 p-2 border rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input
          type="date"
          value={afterFilter}
          onChange={(e) => setAfterFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="text-left bg-gray-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-center">
                  No patients found
                </td>
              </tr>
            )}
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
                <td className="p-3">{p.status}</td>
                <td className="p-3">{p.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
