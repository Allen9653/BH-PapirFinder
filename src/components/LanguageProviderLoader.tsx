import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface LanguageProviderLoaderProps {
  children: ReactNode;
  isLoading: boolean;
}

const LanguageProviderLoader = ({ children, isLoading }: LanguageProviderLoaderProps) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#003D7A] mx-auto" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Loading BH PapirFinder</h2>
            <p className="text-sm text-gray-600">Initializing language context...</p>
          </div>
          {/* Skeleton Content */}
          <div className="max-w-md mx-auto space-y-3 pt-8">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LanguageProviderLoader;