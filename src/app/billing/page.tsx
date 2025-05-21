'use client';

import Timer from '@components/billing/Timer';
import InvoiceCard, { Invoice } from '@components/billing/InvoiceCard';
import { useState } from 'react';

const initialInvoices: Invoice[] = [
  { id: 1, patient: 'John Doe', amount: '$200', status: 'Pending', dueDate: '2024-06-01' },
  { id: 2, patient: 'Jane Smith', amount: '$150', status: 'Paid', dueDate: '2024-05-15' },
  { id: 3, patient: 'Alex Johnson', amount: '$300', status: 'Overdue', dueDate: '2024-04-20' },
];

export default function BillingPage() {
  const [rate, setRate] = useState('200');
  const [entries, setEntries] = useState<number[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  const handleStop = (secs: number) => {
    if (secs > 0) setEntries([...entries, secs]);
  };

  const totalHours = entries.reduce((t, s) => t + s / 3600, 0);

  const format = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateInvoice = () => {
    const amount = `$${(totalHours * parseInt(rate)).toFixed(2)}`;
    const newInv: Invoice = {
      id: invoices.length + 1,
      patient: 'New Session',
      amount,
      status: 'Pending',
      dueDate: new Date().toISOString().slice(0, 10),
    };
    setInvoices([newInv, ...invoices]);
    setEntries([]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Time Tracking / Billing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Timer onStop={handleStop} />
          <div className="p-6 bg-white rounded shadow space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rate">
                Rate
              </label>
              <select
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="150">$150/hr</option>
                <option value="200">$200/hr</option>
                <option value="250">$250/hr</option>
              </select>
            </div>
            <div className="text-sm">
              {entries.map((e, i) => (
                <div key={i} className="flex justify-between">
                  <span>Entry {i + 1}</span>
                  <span>{format(e)}</span>
                </div>
              ))}
              <div className="font-medium mt-2">Total: {totalHours.toFixed(2)}h</div>
            </div>
            <button
              onClick={generateInvoice}
              disabled={entries.length === 0}
              className="w-full px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Generate Invoice
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {invoices.map((inv) => (
            <InvoiceCard key={inv.id} invoice={inv} />
          ))}
        </div>
      </div>
    </div>
  );
}
