import { FileText, CheckCircle } from 'lucide-react';

export interface DownloadFile {
  id: number;
  name: string;
  progress: number; // percentage 0-100
}

function DownloadItem({ file }: { file: DownloadFile }) {
  const complete = file.progress >= 100;
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {complete ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <FileText className="h-4 w-4 text-accent" />
        )}
        <span className="text-sm font-medium">{file.name}</span>
        <span className="ml-auto text-sm text-gray-500">
          {complete ? 'Ready' : `${file.progress}%`}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-full rounded bg-accent transition-all"
          style={{ width: `${Math.min(file.progress, 100)}%` }}
        />
      </div>
    </div>
  );
}

export interface DownloadsProps {
  files: DownloadFile[];
}

export default function Downloads({ files }: DownloadsProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-medium mb-4">Resources</h2>
      <div className="space-y-4">
        {files.map((file) => (
          <DownloadItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
