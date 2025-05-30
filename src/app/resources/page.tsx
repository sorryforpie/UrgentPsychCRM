"use client";

import { useState } from 'react';
import { Upload, Printer, Eye } from 'lucide-react';

interface Resource {
  id: number;
  name: string;
  url: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setResources((prev) => [
        ...prev,
        { id: Date.now(), name: file.name, url },
      ]);
      e.target.value = '';
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const printSelected = () => {
    const items = resources.filter((r) => selected.includes(r.id));
    if (items.length === 0) return;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(
        items
          .map(
            (i) =>
              `<embed src="${i.url}" type="application/pdf" width="100%" height="100%" />`,
          )
          .join(''),
      );
      w.document.close();
      w.print();
    }
  };

  const handlePrint = (resource: Resource) => {
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(
        `<embed src="${resource.url}" type="application/pdf" width="100%" height="100%" />`,
      );
      w.document.close();
      w.print();
    }
  };

  const previewResource = (resource: Resource) => {
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(
        `<embed src="${resource.url}" type="application/pdf" width="100%" height="100%" />`,
      );
      w.document.close();
    }
  };

  const handleDelete = (id: number) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    setSelected((prev) => prev.filter((i) => i !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Community Resources</h1>
        <div className="flex gap-2">
          <button
            onClick={printSelected}
            disabled={selected.length === 0}
            className="flex items-center gap-1 px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            <Printer className="h-4 w-4" /> Export PDF
          </button>
          <label className="cursor-pointer px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700 flex items-center gap-2">
            <Upload className="h-4 w-4" /> Upload
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>
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
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(res.id)}
                  onChange={() => toggleSelect(res.id)}
                />
                <span>{res.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => previewResource(res)}
                  className="flex items-center gap-1 text-accent hover:underline text-sm"
                >
                  <Eye className="h-4 w-4" /> Preview
                </button>
                <button
                  onClick={() => handlePrint(res)}
                  className="flex items-center gap-1 text-accent hover:underline text-sm"
                >
                  <Printer className="h-4 w-4" /> Export
                </button>
                <button
                  onClick={() => handleDelete(res.id)}
                  className="flex items-center gap-1 text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
