export interface Invoice {
  id: number;
  patient: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
}

import { useState } from 'react';

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const [status, setStatus] = useState<Invoice['status']>(invoice.status);
  const statusColor =
    status === 'Paid'
      ? 'text-green-700'
      : status === 'Pending'
      ? 'text-yellow-600'
      : 'text-red-600';

  const markPaid = () => setStatus('Paid');

  return (
    <div className="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <div className="font-semibold">{invoice.patient}</div>
        <div className="text-sm text-gray-500">Due {invoice.dueDate}</div>
      </div>
      <div className="text-right">
        <div className="font-medium">{invoice.amount}</div>
        <div className={`text-sm ${statusColor}`}>{status}</div>
      </div>
      {status !== 'Paid' && (
        <button
          onClick={markPaid}
          className="ml-4 px-3 py-1 text-sm rounded bg-accent text-white hover:bg-indigo-700"
        >
          Mark Paid
        </button>
      )}
    </div>
  );
}
