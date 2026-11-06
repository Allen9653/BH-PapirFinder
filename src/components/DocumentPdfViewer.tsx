import React from 'react';
import ReactPdfViewer from '@/components/ReactPdfViewer';

interface DocumentPdfViewerProps {
  fileUrl: string;
  displayName: string;
  category?: string;
  municipality?: string;
  onDownload?: () => void;
  className?: string;
}

export default function DocumentPdfViewer({
  fileUrl,
  displayName,
  category,
  municipality,
  onDownload,
  className = '',
}: DocumentPdfViewerProps) {
  return (
    <ReactPdfViewer
      fileUrl={fileUrl}
      displayName={displayName}
      category={category}
      municipality={municipality}
      onDownload={onDownload}
      className={className}
    />
  );
}
