'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import DocumentItem, { DocumentFile } from '@components/documents/DocumentItem';
import FolderCard, { Folder } from '@components/documents/FolderCard';

const initialDocs: DocumentFile[] = [
  { id: 1, name: 'Assessment.pdf', revisions: ['Assessment.pdf'] },
  { id: 2, name: 'TreatmentPlan.docx', revisions: ['TreatmentPlan.docx'] },
  { id: 3, name: 'Invoice.xlsx', revisions: ['Invoice.xlsx'] },
  { id: 4, name: 'Notes.txt', revisions: ['Notes.txt'] },
];

const initialFolders: Folder[] = [
  { id: 1, name: 'Reports', docs: [] },
  { id: 2, name: 'Billing', docs: [] },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentFile[]>(initialDocs);
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [dragId, setDragId] = useState<number | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newDoc: DocumentFile = {
      id: Date.now(),
      name: file.name,
      revisions: [file.name],
    };
    setDocuments((prev) => [...prev, newDoc]);
    e.target.value = '';
  };

  const handleDragStart = (id: number) => setDragId(id);

  const handleDrop = (folderId: number) => {
    if (dragId === null) return;
    const doc = documents.find((d) => d.id === dragId);
    if (!doc) return;

    setDocuments(documents.filter((d) => d.id !== dragId));
    setFolders((fs) =>
      fs.map((f) =>
        f.id === folderId ? { ...f, docs: [...f.docs, doc] } : f
      )
    );
    setDragId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <label className="cursor-pointer px-4 py-2 rounded bg-accent text-white hover:bg-indigo-700 flex items-center gap-2">
          <Upload className="h-4 w-4" /> Upload
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-medium mb-2">All Documents</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <DocumentItem
                key={doc.id}
                doc={doc}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-medium mb-2">Folders</h2>
          <div className="space-y-4">
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
