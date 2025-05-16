export interface Matter {
  id: string;
  title: string;
  patient: string;
  status: 'Open' | 'Closed' | 'Archived';
  created: string;
  description: string;
}

export const sampleMatters: Matter[] = [
  {
    id: '1',
    title: 'Medication Adjustment',
    patient: 'John Doe',
    status: 'Open',
    created: '2024-06-10',
    description: 'Review medication plan and adjust dosage as needed.'
  },
  {
    id: '2',
    title: 'Intake Consultation',
    patient: 'Jane Smith',
    status: 'Closed',
    created: '2024-05-22',
    description: 'Initial patient intake and assessment completed.'
  },
  {
    id: '3',
    title: 'Follow Up',
    patient: 'Alex Johnson',
    status: 'Open',
    created: '2024-05-30',
    description: 'Schedule follow up for therapy progress review.'
  }
];

export function getMatter(id: string): Matter | undefined {
  return sampleMatters.find((m) => m.id === id);
}
