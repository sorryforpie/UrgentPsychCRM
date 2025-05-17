"use client";

import { useState } from 'react';
import { Upload, Printer } from 'lucide-react';

interface Resource {
  id: number;
  name: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResources((prev) => [...prev, { id: Date.now(), name: file.name }]);
      e.target.value = '';
    }
  };

  const handlePrint = (resource: Resource) => {
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(`<pre>${resource.name}</pre>`);
      w.document.close();
      w.print();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Community Resources</h1>
        <label className="cursor-pointer px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700 flex items-center gap-2">
          <Upload className="h-4 w-4" /> Upload
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>
      {resources.length === 0 ? (
        <p className="text-gray-500">No resources uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {resources.map((res) => (
            <li
              key={res.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <span>{res.name}</span>
              <button
                onClick={() => handlePrint(res)}
                className="flex items-center gap-1 text-accent hover:underline"
              >
                <Printer className="h-4 w-4" /> Print
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
