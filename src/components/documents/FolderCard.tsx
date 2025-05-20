import { Folder as FolderIcon, Trash } from 'lucide-react';
import { DocumentFile } from './DocumentItem';

export interface Folder {
  id: number;
  name: string;
  docs: DocumentFile[];
}

export default function FolderCard({
  folder,
  onDrop,
  onDelete,
}: {
  folder: Folder;
  onDrop: (folderId: number) => void;
  onDelete?: (folderId: number) => void;
}) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(folder.id);
  };
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="p-4 bg-white rounded shadow hover:shadow-md space-y-2"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FolderIcon className="h-5 w-5 text-accent" />
          <span className="font-medium">{folder.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{folder.docs.length} docs</span>
          {onDelete && (
            <button
              onClick={() => onDelete(folder.id)}
              aria-label="Delete folder"
              className="p-1 rounded hover:bg-red-100"
            >
              <Trash className="h-4 w-4 text-red-600" />
            </button>
          )}
        </div>
      </div>
      {folder.docs.length > 0 && (
        <ul className="text-sm space-y-1">
          {folder.docs.map((d) => (
            <li key={d.id} className="flex justify-between">
              <span className="truncate flex-1">{d.name}</span>
              <span className="text-xs text-gray-500">v{d.revisions.length}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
