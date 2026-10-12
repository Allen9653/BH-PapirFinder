import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, CheckCircle, Download, HelpCircle, BookOpen } from 'lucide-react';
import Footer from '@/components/Footer';

const Guide = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'Šta je BH PapirFinder?',
      answer: 'BH PapirFinder je digitalna aplikacija kreirana od strane www.bh-assistant.ba, koja korisnicima pomaže da brže i jeftinije pronađu besplatne obrasce i formulare na više jezika.',
    },
    {
      question: 'Zašto je aplikacija multijezična?',
      answer: 'Multijezičnost je dodata kako bi pomogla strancima, dijaspori i svima koji žele koristiti obrasce na jeziku koji im je najbliži.',
    },
    {
      question: 'Da li je aplikacija besplatna?',
      answer: 'Aplikacija nudi besplatan probni period. Nakon toga se naplaćuje simbolično radi kreiranja budžeta za održavanje i proširenje funkcionalnosti.',
    },
    {
      question: 'Koje obrasce mogu pronaći?',
      answer: 'Možete pronaći osnovne besplatne obrasce i formulare koje nude općine, gradovi, kantoni/županije i Distrikt Brčko. Državni nivo nije uključen.',
    },
    {
      question: 'Koja je misija BH PapirFinder-a?',
      answer: 'Naša misija je kreiranje alata koji pomaže u prevazilaženju administrativnih prepreka između korisnika i složene birokratske strukture u BiH.',
    },
  ];

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

          {/* Quick Guide */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl text-[#003D7A] flex items-center gap-3">
                <BookOpen className="h-8 w-8" />
                Uputstvo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                <p className="text-gray-800 leading-relaxed text-lg">
                  Kako koristiti BH PapirFinder u 3 koraka:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border shadow-sm">
                  <div className="w-10 h-10 bg-[#003D7A] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex items-start gap-3">
                    <Search className="h-6 w-6 text-[#003D7A] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-lg">Pretražite dokument</h4>
                      <p className="text-gray-600">Npr. „Rodni list", „Izvod iz matične knjige", ili naziv općine.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border shadow-sm">
                  <div className="w-10 h-10 bg-[#00A651] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#00A651] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-lg">Provjerite Trust Score</h4>
                      <p className="text-gray-600">100% = zvanična .gov.ba stranica. Što je veći score, to je izvor pouzdaniji.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border shadow-sm">
                  <div className="w-10 h-10 bg-[#003D7A] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex items-start gap-3">
                    <Download className="h-6 w-6 text-[#003D7A] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-lg">Preuzmite direktno ili aktivirajte Premium</h4>
                      <p className="text-gray-600">Besplatno za ZDK korisnike. Ostali korisnici mogu aktivirati Premium pretplatu.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ZDK Free Access */}
          <Card className="bg-green-50 border-green-200 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-green-800">🟢 Besplatan pristup za ZDK</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Korisnici iz Zeničko-dobojskog kantona imaju besplatan pristup svim funkcijama:
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <li>• Zenica</li>
                <li>• Kakanj</li>
                <li>• Visoko</li>
                <li>• Breza</li>
                <li>• Vareš</li>
                <li>• Maglaj</li>
                <li>• Tešanj</li>
                <li>• Usora</li>
                <li>• Doboj Jug</li>
                <li>• Olovo</li>
                <li>• Žepče</li>
                <li>• Zavidovići</li>
              </ul>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-[#003D7A]">
                <HelpCircle className="h-7 w-7" />
                Najčešća pitanja (FAQ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-[#003D7A] mb-2">
                      {index + 1}. {faq.question}
                    </h3>
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guide;