import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface OfficialDocumentPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  fileType?: 'pdf' | 'docx' | 'doc' | 'html';
}

export default function OfficialDocumentPreview({
  open,
  onOpenChange,
  title,
  url,
  fileType = 'pdf',
}: OfficialDocumentPreviewProps) {
  const previewUrl =
    fileType === 'pdf' || fileType === 'html'
      ? url
      : `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[90vh] max-w-5xl flex-col gap-3">
        <DialogHeader className="pr-8">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Službeni dokument sa web-stranice institucije.
          </DialogDescription>
        </DialogHeader>
        <iframe
          title={title}
          src={previewUrl}
          className="min-h-0 flex-1 w-full rounded-md border bg-white"
          referrerPolicy="no-referrer"
        />
        <div className="flex justify-end">
          <Button asChild variant="outline">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Otvori originalni dokument
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
