import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#003D7A] mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">{t('error')}</p>
        <p className="text-gray-600 mb-8">Stranica koju tražite ne postoji.</p>
        <Link to="/">
          <Button size="lg" className="bg-[#003D7A] hover:bg-[#002A5A]">
            <Home className="h-5 w-5 mr-2" />
            {t('home')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;