'use client';

import { useState } from 'react';
import DocumentItem, { DocumentFile } from '@components/documents/DocumentItem';
import FolderCard, { Folder } from '@components/documents/FolderCard';

const initialDocs: DocumentFile[] = [
  { id: 1, name: 'Assessment.pdf' },
  { id: 2, name: 'TreatmentPlan.docx' },
  { id: 3, name: 'Invoice.xlsx' },
  { id: 4, name: 'Notes.txt' },
];

const initialFolders: Folder[] = [
  { id: 1, name: 'Reports', docs: [] },
  { id: 2, name: 'Billing', docs: [] },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentFile[]>(initialDocs);
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [dragId, setDragId] = useState<number | null>(null);

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
      <h1 className="text-2xl font-semibold">Documents</h1>
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
