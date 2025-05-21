'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormState {
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  lastVisit: string;
  avatar: string;
}

export default function NewPatientPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    status: 'Active',
    lastVisit: '',
    avatar: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email.trim()) {
      err.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = 'Invalid email';
    }
    if (!form.phone.trim()) err.phone = 'Phone is required';
    if (!form.lastVisit.trim()) err.lastVisit = 'Last visit date is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        router.push('/patients');
      } else {
        alert('Failed to create patient');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">New Patient</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Last Visit</label>
          <input
            type="date"
            name="lastVisit"
            value={form.lastVisit}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.lastVisit && (
            <p className="text-red-600 text-sm">{errors.lastVisit}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Avatar URL</label>
          <input
            type="url"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700"
        >
          Create Patient
        </button>
      </form>
    </div>
  );
}
