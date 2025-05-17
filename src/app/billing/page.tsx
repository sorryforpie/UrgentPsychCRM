import Timer from '@components/billing/Timer';
import InvoiceCard, { Invoice } from '@components/billing/InvoiceCard';
import { useState } from 'react';

const invoices: Invoice[] = [
  { id: 1, patient: 'John Doe', amount: '$200', status: 'Pending', dueDate: '2024-06-01' },
  { id: 2, patient: 'Jane Smith', amount: '$150', status: 'Paid', dueDate: '2024-05-15' },
  { id: 3, patient: 'Alex Johnson', amount: '$300', status: 'Overdue', dueDate: '2024-04-20' },
];

export default function BillingPage() {
  const [rate, setRate] = useState('200');
  const [hours, setHours] = useState(1);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Time Tracking / Billing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Timer />
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
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="hours">
                Hours
              </label>
              <input
                id="hours"
                type="range"
                min="0"
                max="8"
                step="0.25"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-right mt-1">{hours}h</div>
            </div>
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
