import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import ReactPdfViewer from '@/components/ReactPdfViewer';

interface OfficialDocumentPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  fileType?: 'pdf' | 'docx' | 'doc' | 'html';
  category?: string;
  municipality?: string;
  fileSizeKB?: number;
}

export default function OfficialDocumentPreview({
  open,
  onOpenChange,
  title,
  url,
  fileType = 'pdf',
  category,
  municipality,
  fileSizeKB,
}: OfficialDocumentPreviewProps) {
  const isPdf = fileType === 'pdf' || url.toLowerCase().endsWith('.pdf') || url.includes('.pdf?');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[92vh] p-0 overflow-hidden bg-slate-950 border-slate-800 flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Službeni preglednik administrativnih dokumenata unutar preglednika
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 h-full min-h-0 flex flex-col">
          {isPdf ? (
            <ReactPdfViewer
              fileUrl={url}
              displayName={title}
              category={category}
              municipality={municipality}
              fileSizeKB={fileSizeKB}
              onClose={() => onOpenChange(false)}
              className="h-full border-0 rounded-none shadow-none"
            />
          ) : (
            <div className="flex flex-col h-full bg-slate-950">
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-slate-400">Prikaz dokumenta putem web preglednika</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-md"
                >
                  ✕
                </button>
              </div>
              <iframe
                title={title}
                src={
                  fileType === 'html'
                    ? url
                    : `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url)}`
                }
                className="flex-1 w-full border-0 bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
