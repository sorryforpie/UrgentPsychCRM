import React from 'react';

export interface TimelineEvent {
  date: string;
  title: string;
  note?: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-accent"></div>
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">{event.date}</div>
        <div className="font-medium">{event.title}</div>
        {event.note && <div className="text-sm text-gray-600 mt-1">{event.note}</div>}
      </div>
    </div>
  );
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-medium mb-4">Timeline</h2>
      <div className="relative">
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-200" />
        {events.map((e, idx) => (
          <TimelineItem key={idx} event={e} />
        ))}
      </div>
    </div>
  );
}
