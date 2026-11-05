import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { getUserAccount, logoutUser } from '@/lib/trial';
import { deleteUserAccount, clearSearchHistory } from '@/lib/supabaseClient';

const DeleteAccount = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userAccount = getUserAccount();

  const handleDelete = async () => {
    setError('');
    setLoading(true);

    if (!userAccount) {
      setError('Niste prijavljeni. Molimo prijavite se prvo.');
      setLoading(false);
      return;
    }

    if (confirmEmail !== userAccount.email) {
      setError('Email adresa se ne podudara sa vašim nalogom.');
      setLoading(false);
      return;
    }

    if (!confirmed) {
      setError('Morate potvrditi da razumijete posljedice brisanja naloga.');
      setLoading(false);
      return;
    }

    try {
      // Clear search history from Supabase
      await clearSearchHistory();

      // Sign out and clear Supabase session
      await deleteUserAccount();

      // Clear all localStorage data
      const keysToRemove = [
        'bh_papirfinder_user_account',
        'bh_papirfinder_trial_start',
        'bh_papirfinder_user_logged_in',
        'bh_papirfinder_user_session',
        'bh_papirfinder_searches',
        'bh_papirfinder_language',
        'bh_papirfinder_admin',
        'bh_papirfinder_admin_email',
      ];

      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          console.error(`Failed to remove ${key}:`, e);
        }
      });

      logoutUser();
      setDeleted(true);
    } catch (err) {
      console.error('Delete account error:', err);
      setError('Došlo je do greške pri brisanju naloga. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  };

  if (deleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-700">Nalog uspješno obrisan</CardTitle>
            <CardDescription>
              Svi vaši podaci su obrisani.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                Ako ste imali aktivnu pretplatu putem PayPal-a, molimo kontaktirajte nas na{' '}
                <strong>info@bh-assistant.ba</strong> za otkazivanje pretplate.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full bg-[#003D7A] hover:bg-[#002A5A]"
              onClick={() => navigate('/')}
            >
              Nazad na početnu stranicu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4">
      <div className="container max-w-lg mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nazad
          </Button>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600 flex items-center gap-2">
              <Trash2 className="h-6 w-6" />
              Brisanje naloga
            </CardTitle>
            <CardDescription>
              GDPR - Pravo na brisanje ličnih podataka
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Upozorenje:</strong> Ova akcija je nepovratna. Svi vaši podaci će biti trajno obrisani, uključujući:
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Vaš korisnički profil</li>
                  <li>Historija pretraga (Supabase + lokalno)</li>
                  <li>Postavke jezika</li>
                  <li>Status pretplate</li>
                </ul>
              </AlertDescription>
            </Alert>

            {!userAccount && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertDescription className="text-yellow-800">
                  Niste prijavljeni. Molimo{' '}
                  <a href="/login" className="underline font-semibold">prijavite se</a>{' '}
                  prvo da biste obrisali svoj nalog.
                </AlertDescription>
              </Alert>
            )}

            {userAccount && (
              <>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Prijavljeni kao:</p>
                  <p className="font-medium">{userAccount.name}</p>
                  <p className="text-sm text-gray-500">{userAccount.email}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-email">
                    Unesite vašu email adresu za potvrdu
                  </Label>
                  <Input
                    id="confirm-email"
                    type="email"
                    placeholder={userAccount.email}
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="confirm-delete"
                    checked={confirmed}
                    onCheckedChange={(checked) => setConfirmed(checked === true)}
                  />
                  <label
                    htmlFor="confirm-delete"
                    className="text-sm text-gray-700 leading-tight cursor-pointer"
                  >
                    Razumijem da će svi moji podaci biti trajno obrisani i da ova akcija ne može biti poništena.
                  </label>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleDelete}
                  disabled={!confirmed || !confirmEmail || loading}
                >
                  {loading ? (
                    'Brisanje u toku...'
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Trajno obriši moj nalog
                    </>
                  )}
                </Button>
              </>
            )}

            <div className="pt-4 border-t text-center">
              <p className="text-xs text-gray-500">
                U skladu sa GDPR i Zakonom o zaštiti ličnih podataka BiH,
                imate pravo na brisanje svih vaših ličnih podataka.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Za dodatna pitanja: <strong>info@bh-assistant.ba</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeleteAccount;