"use client";
import Calendar from '@components/Calendar';
import { CalendarEvent } from '@components/Calendar';
import { useState, useEffect } from 'react';

const sampleEvents: CalendarEvent[] = [
  {
    date: new Date().toISOString().slice(0, 10),
    title: 'Morning Rounds',
    type: 'appointment',
    details: 'Ward A, 8:00 AM',
  },
  {
    date: new Date().toISOString().slice(0, 10),
    title: 'Write Notes',
    type: 'task',
    details: 'Finish patient summaries',
  },
  {
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    title: 'Follow-up',
    type: 'appointment',
    details: 'Check in with patient B',
  },
];

const emptyEvent: CalendarEvent = { date: '', title: '', type: 'default', details: '' };

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [form, setForm] = useState<CalendarEvent>(emptyEvent);
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('calendarEvents');
    if (stored) setEvents(JSON.parse(stored));
    else setEvents(sampleEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const saveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.title) return;
    if (editing !== null) {
      setEvents(events.map((ev, idx) => (idx === editing ? form : ev)));
    } else {
      setEvents([...events, form]);
    }
    setForm(emptyEvent);
    setEditing(null);
  };

  const handleEdit = (ev: CalendarEvent, idx: number) => {
    setForm(ev);
    setEditing(idx);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Calendar</h1>
      <Calendar events={events} onEventEdit={handleEdit} />
      <form onSubmit={saveEvent} className="p-4 bg-white rounded shadow space-y-2">
        <div className="flex gap-2">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-2 border rounded w-36"
            required
          />
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="flex-1 p-2 border rounded"
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as CalendarEvent['type'] })}
            className="p-2 border rounded"
          >
            <option value="default">Other</option>
            <option value="appointment">Appointment</option>
            <option value="task">Task</option>
          </select>
        </div>
        <textarea
          placeholder="Details"
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          className="w-full p-2 border rounded"
          rows={2}
        />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700">
            {editing !== null ? 'Save' : 'Add'}
          </button>
          {editing !== null && (
            <button
              type="button"
              onClick={() => {
                setForm(emptyEvent);
                setEditing(null);
              }}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
