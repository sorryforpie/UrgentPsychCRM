import { FileText } from 'lucide-react';

export interface DocumentFile {
  id: number;
  name: string;
  revisions: string[];
}

export default function DocumentItem({
  doc,
  onDragStart,
}: {
  doc: DocumentFile;
  onDragStart: (id: number) => void;
}) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(doc.id)}
      className="flex items-center gap-2 p-3 bg-white rounded shadow cursor-move hover:shadow-md"
    >
      <FileText className="h-4 w-4 text-accent" />
      <span className="text-sm truncate flex-1">{doc.name}</span>
      <span className="text-xs text-gray-500">v{doc.revisions.length}</span>
    </div>
  );
}
