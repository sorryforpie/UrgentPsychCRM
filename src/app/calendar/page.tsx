import Calendar from '@components/Calendar';
import { CalendarEvent } from '@components/Calendar';

const sampleEvents: CalendarEvent[] = [
  { date: new Date().toISOString().slice(0,10), title: 'Morning Rounds', type: 'appointment' },
  { date: new Date().toISOString().slice(0,10), title: 'Write Notes', type: 'task' },
  { date: new Date(Date.now() + 3*24*60*60*1000).toISOString().slice(0,10), title: 'Follow-up', type: 'appointment' },
];

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Calendar</h1>
      <Calendar events={sampleEvents} />
    </div>
  );
}
