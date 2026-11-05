import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import Footer from '@/components/Footer';

const Terms = () => {
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
              <CardTitle className="text-3xl text-[#003D7A] flex items-center gap-3">
                <FileText className="h-8 w-8" />
                Uslovi korištenja
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-gray-800 leading-relaxed text-lg">
                  BH PapirFinder je agregator zvaničnih informacija. Pretplata se vrši putem PayPala. 
                  Korisnici iz ZDK (Zeničko-dobojskog kantona) ostvaruju pravo na besplatan pristup 
                  u sklopu naše društvene odgovornosti.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#003D7A]">Opći uslovi</h3>
                
                <div className="space-y-3 text-gray-700">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-1">Priroda usluge</h4>
                    <p className="text-sm">BH PapirFinder je agregator koji prikuplja i organizuje javno dostupne informacije sa zvaničnih web stranica lokalne samouprave u Bosni i Hercegovini.</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-1">Plaćanje</h4>
                    <p className="text-sm">Pretplata se vrši isključivo putem PayPal platforme. Cijene su izražene u BAM (Konvertibilna marka). Sva plaćanja su sigurna i enkriptovana.</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold mb-1 text-green-800">Besplatan pristup za ZDK</h4>
                    <p className="text-sm text-green-700">
                      Korisnici iz Zeničko-dobojskog kantona (ZDK) ostvaruju pravo na besplatan pristup svim funkcijama aplikacije. 
                      Ovo uključuje općine: Zenica, Kakanj, Visoko, Breza, Vareš, Maglaj, Tešanj, Usora, Doboj Jug, Olovo, Žepče i Zavidovići.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-1">Odgovornost</h4>
                    <p className="text-sm">BH PapirFinder ne garantuje tačnost informacija prikupljenih sa vanjskih izvora. Korisnici su odgovorni za provjeru informacija na zvaničnim stranicama.</p>
                    <div className="mt-3 space-y-2 text-sm">
                      <p>{t('terms.status')}</p>
                      <p>{t('terms.disclaimerForms')}</p>
                      <p>{t('terms.userLiability')}</p>
                      <p>{t('terms.modification')}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-1">Otkazivanje</h4>
                    <p className="text-sm">Pretplatu možete otkazati u bilo kojem trenutku. Za pomoć pri otkazivanju kontaktirajte nas na info@bh-assistant.ba.</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-xs text-gray-500">
                  B&H Assistant d.o.o. | Zenica 72 000 | JIB: 4219296620005 | MBS: 43-01-0177-25
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

export default Terms;