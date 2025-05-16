export interface TimelineEvent {
  date: string;
  description: string;
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  timeline: TimelineEvent[];
}

const patients: Patient[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0101',
    avatar: 'https://i.pravatar.cc/150?img=11',
    timeline: [
      { date: '2024-05-01', description: 'Initial consultation' },
      { date: '2024-05-15', description: 'Follow-up visit' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-0102',
    avatar: 'https://i.pravatar.cc/150?img=12',
    timeline: [
      { date: '2024-04-20', description: 'Medication review' },
      { date: '2024-05-22', description: 'Therapy session' },
    ],
  },
  {
    id: 3,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '555-0103',
    avatar: 'https://i.pravatar.cc/150?img=13',
    timeline: [
      { date: '2024-03-05', description: 'Referral received' },
      { date: '2024-04-01', description: 'First appointment' },
    ],
  },
  {
    id: 4,
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '555-0104',
    avatar: 'https://i.pravatar.cc/150?img=14',
    timeline: [
      { date: '2024-02-10', description: 'Emergency visit' },
      { date: '2024-03-12', description: 'Stabilization follow-up' },
    ],
  },
  {
    id: 5,
    name: 'Li Wong',
    email: 'li@example.com',
    phone: '555-0105',
    avatar: 'https://i.pravatar.cc/150?img=15',
    timeline: [
      { date: '2024-01-30', description: 'Routine check-up' },
      { date: '2024-02-27', description: 'Therapy session' },
    ],
  },
];

export default patients;
