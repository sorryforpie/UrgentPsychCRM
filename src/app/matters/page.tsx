'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Matter {
  id: number;
  title: string;
  patientId: number;
  patient: { name: string } | null;
  status: string;
  created: string;
  description: string;
}

export default function MattersPage() {
  const [query, setQuery] = useState('');
  const [matters, setMatters] = useState<Matter[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<keyof Matter>('created');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch('/api/matters')
      .then((res) => res.json())
      .then((data) => setMatters(data));
  }, []);

  const toggleSort = (key: keyof Matter) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = matters
    .filter(
      (m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        (m.patient?.name.toLowerCase() ?? '').includes(query.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      const comp = String(valA).localeCompare(String(valB));
      return sortDir === 'asc' ? comp : -comp;
    });

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((m) => m.id));
    }
  };

  const archiveSelected = () => {
    setMatters((ms) =>
      ms.map((m) =>
        selected.includes(m.id) ? { ...m, status: 'Archived' } : m
      )
    );
    setSelected([]);
  };

  const closeSelected = () => {
    setMatters((ms) =>
      ms.map((m) => (selected.includes(m.id) ? { ...m, status: 'Closed' } : m))
    );
    setSelected([]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Matters</h1>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Filter matters..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-64 p-2 border rounded shadow-inner"
        />
        <div className="flex gap-2">
          <button
            onClick={archiveSelected}
            disabled={selected.length === 0}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Archive Selected
          </button>
          <button
            onClick={closeSelected}
            disabled={selected.length === 0}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Close Selected
          </button>
        </div>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => toggleSort('title')}
              >
                Matter
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => toggleSort('patient')}
              >
                Patient
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => toggleSort('status')}
              >
                Status
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => toggleSort('created')}
              >
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((m: Matter) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(m.id)}
                    onChange={() => toggleSelect(m.id)}
                  />
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/matters/${m.id}`}
                    className="text-accent hover:underline"
                  >
                    {m.title}
                  </Link>
                </td>
                <td className="px-4 py-2">{m.patient?.name}</td>
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
