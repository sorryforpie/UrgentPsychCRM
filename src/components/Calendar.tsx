import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface CalendarEvent {
  date: string; // YYYY-MM-DD
  title: string;
  type?: 'default' | 'appointment' | 'task';
}

interface CalendarProps {
  initialDate?: Date;
  events?: CalendarEvent[];
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatMonthYear(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getMonthDays(date: Date) {
  const first = startOfMonth(date);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7));
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function Calendar({ initialDate = new Date(), events = [] }: CalendarProps) {
  const [current, setCurrent] = useState(startOfMonth(initialDate));
  const days = getMonthDays(current);

  const eventsMap = events.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  const badgeColor = (type?: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-accent/90';
      case 'task':
        return 'bg-green-600';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent(addMonths(current, -1))}
          aria-label="Previous month"
          className="p-2 rounded hover:bg-gray-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold">{formatMonthYear(current)}</h2>
        <button
          onClick={() => setCurrent(addMonths(current, 1))}
          aria-label="Next month"
          className="p-2 rounded hover:bg-gray-200"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-sm text-center font-medium">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded">
        {days.map((day) => {
          const isCurrent = day.getMonth() === current.getMonth();
          const dateKey = day.toISOString().slice(0,10);
          const dayEvents = eventsMap[dateKey] || [];
          return (
            <div
              key={dateKey}
              className={`h-24 p-1 bg-white flex flex-col text-xs rounded-sm ${
                isCurrent ? '' : 'text-gray-400'
              }`}
            >
              <div className="self-end text-xs font-medium">{day.getDate()}</div>
              <div className="space-y-0.5 overflow-hidden">
                {dayEvents.map((ev, idx) => (
                  <span
                    key={idx}
                    className={`block truncate text-white px-1 rounded ${badgeColor(ev.type)}`}
                  >
                    {ev.title}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
