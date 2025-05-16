import { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const toggle = () => setRunning(!running);
  const reset = () => {
    setSeconds(0);
    setRunning(false);
  };

  const format = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-lg font-medium mb-4">Time Tracker</h2>
      <div className="text-3xl font-mono mb-4">{format(seconds)}</div>
      <div className="space-x-2">
        <button
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={toggle}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
