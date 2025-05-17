'use client';
import { useState } from 'react';
import { FolderPlus, Upload } from 'lucide-react';
import patients from '@/data/patients';

interface Template {
  id: number;
  name: string;
}

interface Folder {
  id: number;
  name: string;
  templates: Template[];
}

export default function ReferralsPage() {
  const [folders, setFolders] = useState<Folder[]>([
    { id: 1, name: 'General', templates: [] },
    { id: 2, name: 'Assessments', templates: [] },
  ]);
  const [folderName, setFolderName] = useState('');
  const [nextId, setNextId] = useState(3);
  const [patientQuery, setPatientQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const addFolder = () => {
    if (!folderName.trim()) return;
    setFolders([...folders, { id: nextId, name: folderName.trim(), templates: [] }]);
    setNextId(nextId + 1);
    setFolderName('');
  };

  const uploadTemplate = (folderId: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              templates: [
                ...folder.templates,
                { id: Date.now(), name: files[0].name },
              ],
            }
          : folder,
      ),
    );
  };

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPatientQuery(val);
    const patient = patients.find(
      (p) => p.name.toLowerCase() === val.toLowerCase(),
    );
    setSelectedPatientId(patient ? patient.id : null);
  };

  const handleGenerateReferral = () => {
    if (selectedPatientId === null) return;
    // TODO: integrate with document generation feature
    console.log('Selected patient ID for referral:', selectedPatientId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Referral Management</h1>
      <div className="flex gap-2">
        <input
          type="text"
          list="patient-options"
          value={patientQuery}
          onChange={handlePatientChange}
          placeholder="Search patients..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <datalist id="patient-options">
          {patients.map((p) => (
            <option key={p.id} value={p.name} />
          ))}
        </datalist>
        <button
          onClick={handleGenerateReferral}
          disabled={selectedPatientId === null}
          className="px-4 py-2 bg-accent text-white rounded shadow disabled:opacity-50"
        >
          Start Referral
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="New folder name"
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={addFolder}
          className="flex items-center gap-1 px-4 py-2 bg-accent text-white rounded shadow"
        >
          <FolderPlus className="h-4 w-4" /> Add
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <div key={folder.id} className="p-4 bg-white rounded shadow space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">{folder.name}</h2>
              <label className="cursor-pointer px-2 py-1 bg-accent text-white text-sm rounded flex items-center gap-1">
                <Upload className="h-4 w-4" /> Upload
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => uploadTemplate(folder.id, e.target.files)}
                />
              </label>
            </div>
            <ul className="space-y-1 text-sm">
              {folder.templates.length === 0 && (
                <li className="text-gray-400">No templates</li>
              )}
              {folder.templates.map((t) => (
                <li key={t.id}>{t.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
