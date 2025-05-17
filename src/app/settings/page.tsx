'use client';

import { useState } from 'react';
import Toggle from '@components/Toggle';

export default function SettingsPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [publicEmail, setPublicEmail] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsAlert, setSmsAlert] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-lg font-medium">Account</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Enable two-factor authentication</span>
            <Toggle checked={twoFactor} onChange={setTwoFactor} />
          </div>
          <div className="flex items-center justify-between">
            <span>Show email publicly</span>
            <Toggle checked={publicEmail} onChange={setPublicEmail} />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-lg font-medium">Notifications</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Email notifications</span>
            <Toggle checked={emailNotif} onChange={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between">
            <span>SMS alerts</span>
            <Toggle checked={smsAlert} onChange={setSmsAlert} />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow space-y-2">
        <h2 className="text-lg font-medium">Permissions</h2>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">Admin</span>
          <span className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700">Billing</span>
          <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700">Read-only</span>
        </div>
      </section>
    </div>
  );
}
