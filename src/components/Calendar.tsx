'use client';

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface CalendarEvent {
  date: string; // YYYY-MM-DD
  title: string;
  type?: 'default' | 'appointment' | 'task';
  details?: string;
}

interface CalendarProps {
  initialDate?: Date;
  events?: CalendarEvent[];
  onEventEdit?: (ev: CalendarEvent, index: number) => void;
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

function startOfWeek(date: Date) {
  const d = new Date(date);
  const diff = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
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

export default function Calendar({ initialDate = new Date(), events = [], onEventEdit }: CalendarProps) {
  const [current, setCurrent] = useState(startOfMonth(initialDate));
  const [weekStart, setWeekStart] = useState(startOfWeek(initialDate));
  const [expanded, setExpanded] = useState<string | null>(null);
  const days = getMonthDays(current);

  const eventsMap = events.reduce<Record<string, { event: CalendarEvent; index: number }[]>>((acc, ev, idx) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push({ event: ev, index: idx });
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

  const prevWeek = () => {
    const newStart = addDays(weekStart, -7);
    setWeekStart(newStart);
    setCurrent(startOfMonth(newStart));
  };

  const nextWeek = () => {
    const newStart = addDays(weekStart, 7);
    setWeekStart(newStart);
    setCurrent(startOfMonth(newStart));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-1">
          <button
            onClick={prevWeek}
            aria-label="Previous week"
            className="p-1 rounded hover:bg-gray-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextWeek}
            aria-label="Next week"
            className="p-1 rounded hover:bg-gray-200"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-sm text-center font-medium">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded">
        {days.map((day) => {
          const isCurrent = day.getMonth() === current.getMonth();
          const dateKey = day.toISOString().slice(0, 10);
          const dayEvents = eventsMap[dateKey] || [];
          const inWeek =
            day >= weekStart && day < addDays(weekStart, 7);
          return (
            <div
              key={dateKey}
              className={`h-24 p-1 bg-white flex flex-col text-xs rounded-sm ${
                isCurrent ? '' : 'text-gray-400'
              } ${inWeek ? 'bg-indigo-50' : ''}`}
            >
              <div className="self-end text-xs font-medium">{day.getDate()}</div>
              <div className="space-y-0.5 overflow-hidden">
                {dayEvents.map(({ event: ev, index }) => {
                  const id = `${ev.date}-${index}`;
                  return (
                    <div key={id} className="space-y-1">
                      <button
                        onClick={() =>
                          setExpanded(expanded === id ? null : id)
                        }
                        className={`w-full text-left truncate text-white px-1 rounded ${badgeColor(
                          ev.type
                        )}`}
                      >
                        {ev.title}
                      </button>
                      {expanded === id && (
                        <div className="text-gray-700 text-[10px] bg-gray-100 p-1 rounded space-y-1">
                          {ev.details && <div>{ev.details}</div>}
                          {onEventEdit && (
                            <button
                              onClick={() => onEventEdit(ev, index)}
                              className="px-1 py-0.5 text-[10px] rounded bg-accent text-white"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
