'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import patients from '@/data/patients';

interface FormState {
  title: string;
  patient: string;
  status: 'Open' | 'Closed' | 'Archived';
  created: string;
  description: string;
}

export default function NewMatterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: '',
    patient: '',
    status: 'Open',
    created: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.title.trim()) err.title = 'Title is required';
    if (!form.patient.trim()) err.patient = 'Patient is required';
    if (!form.created.trim()) err.created = 'Created date is required';
    if (!form.description.trim()) err.description = 'Description is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await fetch('/api/matters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        router.push('/matters');
      } else {
        alert('Failed to create matter');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">New Matter</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Patient</label>
          <select
            name="patient"
            value={form.patient}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.patient && (
            <p className="text-red-600 text-sm">{errors.patient}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Created</label>
          <input
            type="date"
            name="created"
            value={form.created}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.created && (
            <p className="text-red-600 text-sm">{errors.created}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700"
        >
          Create Matter
        </button>
      </form>
    </div>
  );
}
