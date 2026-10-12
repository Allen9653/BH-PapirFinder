import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, MapPin, Globe, Building2 } from 'lucide-react';
import Footer from '@/components/Footer';

const Support = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <div className="flex-1 py-12 px-4">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazad
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-3 text-[#003D7A]">
                <Mail className="h-8 w-8" />
                {t('support')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg text-gray-800">{t('supportMessage')}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#003D7A]">O nama</h3>
                <p className="text-gray-700">
                  BH PapirFinder je kreiran od strane B&H Assistant d.o.o. sa sjedištem u Zenici, Bosna i Hercegovina.
                </p>
                <p className="text-gray-700">
                  Naša misija je olakšati pristup službenim dokumentima i obrascima za sve građane Bosne i Hercegovine kroz moderan, višejezični digitalni alat.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#003D7A]" />
                  Kontakt informacije
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#003D7A]" />
                    <a href="mailto:info@bh-assistant.ba" className="text-[#003D7A] hover:underline font-medium">
                      info@bh-assistant.ba
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#003D7A]" />
                    <span>Zenica 72 000, Bosna i Hercegovina</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-[#003D7A]" />
                    <a href="https://www.bh-assistant.ba" target="_blank" rel="noopener noreferrer" className="text-[#003D7A] hover:underline">
                      www.bh-assistant.ba
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-xs text-gray-500">
                  B&H Assistant d.o.o. | JIB: 4219296620005 | MBS: 43-01-0177-25
                </p>
                <p className="text-xs text-gray-400 mt-1 italic">
                  „Spajamo Kulture Stvaramo Šanse"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;