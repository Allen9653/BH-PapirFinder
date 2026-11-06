import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import ReactPdfViewer from '@/components/ReactPdfViewer';

export interface DocumentViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentUrl: string;
  title?: string;
  category?: string;
  municipality?: string;
  onDownload?: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  open,
  onOpenChange,
  documentUrl,
  title = 'Dokument',
  category,
  municipality,
  onDownload,
}) => {
  if (!documentUrl) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[92vh] p-0 overflow-hidden bg-slate-950 border-slate-800 flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Prikaz PDF dokumenta u DocumentViewer pregledniku
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 h-full min-h-0 flex flex-col">
          <ReactPdfViewer
            fileUrl={documentUrl}
            displayName={title}
            category={category}
            municipality={municipality}
            onDownload={onDownload}
            onClose={() => onOpenChange(false)}
            className="h-full border-0 rounded-none shadow-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
