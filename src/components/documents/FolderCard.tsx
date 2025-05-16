import { Folder as FolderIcon } from 'lucide-react';
import { DocumentFile } from './DocumentItem';

export interface Folder {
  id: number;
  name: string;
  docs: DocumentFile[];
}

export default function FolderCard({
  folder,
  onDrop,
}: {
  folder: Folder;
  onDrop: (folderId: number) => void;
}) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(folder.id);
  };
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="p-4 bg-white rounded shadow hover:shadow-md"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FolderIcon className="h-5 w-5 text-accent" />
          <span className="font-medium">{folder.name}</span>
        </div>
        <span className="text-sm text-gray-500">{folder.docs.length} docs</span>
      </div>
    </div>
  );
}
