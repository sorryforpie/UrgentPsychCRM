import Timer from '@components/billing/Timer';
import InvoiceCard, { Invoice } from '@components/billing/InvoiceCard';

const invoices: Invoice[] = [
  { id: 1, patient: 'John Doe', amount: '$200', status: 'Pending', dueDate: '2024-06-01' },
  { id: 2, patient: 'Jane Smith', amount: '$150', status: 'Paid', dueDate: '2024-05-15' },
  { id: 3, patient: 'Alex Johnson', amount: '$300', status: 'Overdue', dueDate: '2024-04-20' },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Time Tracking / Billing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Timer />
        <div className="space-y-4">
          {invoices.map((inv) => (
            <InvoiceCard key={inv.id} invoice={inv} />
          ))}
        </div>
      </div>
    </div>
  );
}
