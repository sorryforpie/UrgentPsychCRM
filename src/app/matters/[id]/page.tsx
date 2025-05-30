'use client';
import { useState } from 'react';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Params {
  params: { id: string };
}

interface Matter {
  id: number;
  title: string;
  patient: string;
  status: 'Open' | 'Closed' | 'Archived';
  created: string;
  description: string;
}

export default function MatterDetail({ params }: Params) {
  const [matter, setMatter] = useState<Matter | null>(null);
  const [tab, setTab] = useState<'overview' | 'documents' | 'billing'>('overview');

  useEffect(() => {
    fetch(`/api/matters/${params.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return notFound();
        setMatter(data);
      });
  }, [params.id]);
  if (!matter) return null;

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Left summary sidebar */}
      <aside className="md:w-64 shrink-0 space-y-4 bg-white rounded shadow p-4 overflow-y-auto">
        <h1 className="text-xl font-semibold">{matter.title}</h1>
        <div>
          <strong>Patient:</strong> {matter.patient}
        </div>
        <div>
          <strong>Status:</strong> {matter.status}
        </div>
        <div>
          <strong>Created:</strong> {matter.created}
        </div>
        <p className="pt-2">{matter.description}</p>
        <Link href="/matters" className="text-accent hover:underline block">
          Back to list
        </Link>
      </aside>

      {/* Right tabbed content */}
      <section className="flex-1 flex flex-col">
        <div className="flex space-x-4 border-b mb-4">
          <button
            onClick={() => setTab('overview')}
            className={`py-2 px-1${tab === 'overview' ? ' border-b-2 border-accent font-medium' : ''}`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab('documents')}
            className={`py-2 px-1${tab === 'documents' ? ' border-b-2 border-accent font-medium' : ''}`}
          >
            Documents
          </button>
          <button
            onClick={() => setTab('billing')}
            className={`py-2 px-1${tab === 'billing' ? ' border-b-2 border-accent font-medium' : ''}`}
          >
            Billing
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {tab === 'overview' && (
            <details open className="bg-white rounded shadow p-4">
              <summary className="cursor-pointer font-medium">Overview</summary>
              <p className="mt-2 italic text-gray-500">No additional information.</p>
            </details>
          )}

          {tab === 'documents' && (
            <details open className="bg-white rounded shadow p-4">
              <summary className="cursor-pointer font-medium">Documents</summary>
              <p className="mt-2 italic text-gray-500">No documents yet.</p>
            </details>
          )}

          {tab === 'billing' && (
            <details open className="bg-white rounded shadow p-4">
              <summary className="cursor-pointer font-medium">Billing</summary>
              <p className="mt-2 italic text-gray-500">No billing info yet.</p>
            </details>
          )}
        </div>
      </section>
    </div>
  );
}
