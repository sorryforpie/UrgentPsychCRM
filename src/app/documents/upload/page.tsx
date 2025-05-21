'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadDocumentPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('File is required');
      return;
    }
    setError('');
    const data = new FormData();
    data.append('file', file);
    data.append('description', description);
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        router.push('/documents');
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Upload Document</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block mb-1 font-medium">File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
