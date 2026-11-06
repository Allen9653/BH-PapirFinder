import { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getDirectoryEntry,
  hasNoListedMunicipalityDocuments,
  safeHttpsUrl,
  type DirectoryForm,
} from '@/lib/institution-directory';
import { useDirectoryVersion } from '@/hooks/use-directory-version';
import { getMunicipalityContactEmail } from '@/data/municipality-contact-emails';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Building2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Languages,
  Pencil,
  Printer,
  Save,
  Share2,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DocumentViewer from '@/components/DocumentViewer';
import OfficialDocumentPreview from '@/components/OfficialDocumentPreview';
import TagNavigation, { matchesTagFilter } from '@/components/TagNavigation';
import InstitutionAutocomplete from '@/components/InstitutionAutocomplete';
import MunicipalityEmailRequest from '@/components/MunicipalityEmailRequest';
import { saveDocumentLocally } from '@/lib/saved-documents';
