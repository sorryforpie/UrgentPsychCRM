import React from 'react';

interface Field {
  label: string;
  value: string;
  type?: string;
}

function ReadonlyField({ label, value, type = 'text' }: Field) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        disabled
        className="mt-1 w-full rounded border-gray-200 bg-gray-100 p-2"
      />
    </div>
  );
}

export interface PatientInfoProps {
  fields: Field[];
}

export default function PatientInfo({ fields }: PatientInfoProps) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-lg font-medium">Patient Information</h2>
      <div className="space-y-4">
        {fields.map((f) => (
          <ReadonlyField key={f.label} {...f} />
        ))}
      </div>
    </div>
  );
}
