export interface Invoice {
  id: number;
  patient: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
}

export default function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const statusColor =
    invoice.status === 'Paid'
      ? 'text-green-700'
      : invoice.status === 'Pending'
      ? 'text-yellow-600'
      : 'text-red-600';

  return (
    <div className="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <div className="font-semibold">{invoice.patient}</div>
        <div className="text-sm text-gray-500">Due {invoice.dueDate}</div>
      </div>
      <div className="text-right">
        <div className="font-medium">{invoice.amount}</div>
        <div className={`text-sm ${statusColor}`}>{invoice.status}</div>
      </div>
    </div>
  );
}
