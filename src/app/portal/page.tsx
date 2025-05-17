import PatientInfo from '@components/portal/PatientInfo';
import Timeline, { TimelineEvent } from '@components/portal/Timeline';
import Downloads, { DownloadFile } from '@components/portal/Downloads';

const patientFields = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Date of Birth', value: '1980-05-15', type: 'date' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Phone', value: '(555) 123-4567' },
  { label: 'Address', value: '123 Main St, Springfield' },
  { label: 'Insurance', value: 'Acme Health' },
];

const timeline: TimelineEvent[] = [
  {
    date: '2024-05-01',
    title: 'Initial Consultation',
    note: 'Discussed treatment goals and medication history.',
  },
  {
    date: '2024-05-15',
    title: 'Follow-up Appointment',
    note: 'Patient reports improved mood and sleep.',
  },
  {
    date: '2024-06-01',
    title: 'Medication Adjustment',
    note: 'Increased dosage of prescribed medication.',
  },
];

const resources: DownloadFile[] = [
  { id: 1, name: 'Treatment Plan.pdf', progress: 100 },
  { id: 2, name: 'Medication Guide.pdf', progress: 60 },
  { id: 3, name: 'Exercise Tips.pdf', progress: 20 },
];

export default function PatientPortalPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Patient Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientInfo fields={patientFields} />
        <Timeline events={timeline} />
      </div>
      <Downloads files={resources} />
    </div>
  );
}
