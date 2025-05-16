'use client';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMatter } from '@/data/sampleMatters';

interface Params {
  params: { id: string };
}

export default function MatterDetail({ params }: Params) {
  const matter = getMatter(params.id);
  const [tab, setTab] = useState<'details' | 'notes'>('details');

  if (!matter) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{matter.title}</h1>
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setTab('details')}
          className={`py-2 px-1${
            tab === 'details' ? ' border-b-2 border-accent font-medium' : ''
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setTab('notes')}
          className={`py-2 px-1${
            tab === 'notes' ? ' border-b-2 border-accent font-medium' : ''
          }`}
        >
          Notes
        </button>
      </div>
      {tab === 'details' ? (
        <div className="space-y-2">
          <div>
            <strong>Patient:</strong> {matter.patient}
          </div>
          <div>
            <strong>Status:</strong> {matter.status}
          </div>
          <div>
            <strong>Created:</strong> {matter.created}
          </div>
          <p className="pt-4">{matter.description}</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="italic text-gray-500">No notes yet.</p>
        </div>
      )}
      <Link href="/matters" className="text-accent hover:underline">
        Back to list
      </Link>
    </div>
  );
}
