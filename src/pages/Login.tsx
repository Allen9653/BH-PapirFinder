import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, ArrowLeft } from 'lucide-react';
import { signInUser, supabase } from '@/lib/supabaseClient';
import { loginUser } from '@/lib/trial';
import { isAdminEmail, loginAdmin } from '@/lib/auth';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Administratorski email — kroz admin tok prijave
      if (isAdminEmail(email)) {
        const adminResult = await loginAdmin(email, password);
        if (adminResult.success) {
          localStorage.setItem(
            'bh_papirfinder_user_account',
            JSON.stringify({
              id: 'admin',
              name: 'Admin',
              email,
              status: 'paid',
              createdAt: new Date().toISOString(),
            }),
          );
          localStorage.setItem('bh_papirfinder_user_logged_in', 'true');
          navigate('/');
          return;
        }
        setError(adminResult.error || t('auth.invalidCredentials'));
        setLoading(false);
        return;
      }

      // Redovni korisnici — Supabase Auth
      const { data, error: authError } = (await signInUser(email, password)) || {
        data: null,
        error: null,
      };

      if (data?.user && !authError) {
        const fullName = data.user.user_metadata?.full_name || email.split('@')[0];

        let userStatus: 'paid' | 'trial' = 'trial';
        let paidExpiryDate: string | undefined;
        let trialExpiryDate: string | undefined;

        try {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('subscription_status, subscription_expires_at')
            .eq('user_id', data.user.id)
            .single();

          if (profile?.subscription_status === 'paid' && profile?.subscription_expires_at) {
            const expiresAt = new Date(profile.subscription_expires_at);
            if (expiresAt > new Date()) {
              userStatus = 'paid';
              paidExpiryDate = profile.subscription_expires_at;
            }
          }
        } catch {
          const trialEnd = new Date();
          trialEnd.setDate(trialEnd.getDate() + 7);
          trialExpiryDate = trialEnd.toISOString();
        }

        if (userStatus === 'trial' && !trialExpiryDate) {
          const trialEnd = new Date();
          trialEnd.setDate(trialEnd.getDate() + 7);
          trialExpiryDate = trialEnd.toISOString();
        }

        localStorage.setItem(
          'bh_papirfinder_user_account',
          JSON.stringify({
            id: data.user.id,
            name: fullName,
            email: data.user.email,
            status: userStatus,
            createdAt: data.user.created_at,
            ...(paidExpiryDate && { paidExpiryDate }),
            ...(trialExpiryDate && { trialExpiryDate }),
          }),
        );
        localStorage.setItem('bh_papirfinder_user_logged_in', 'true');
        navigate('/');
        return;
      }

      // Fallback: naslijeđena localStorage prijava (email + kod za prijavu)
      if (loginUser(email, password)) {
        navigate('/');
        return;
      }

      // Testni računi za verificirane testere
      const testAccounts: Record<string, string> = {
        'ajna.besic@proton.me': 'Ajna Bešić',
      };

      if (email.toLowerCase() in testAccounts) {
        const testName = testAccounts[email.toLowerCase()];
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);
        localStorage.setItem(
          'bh_papirfinder_user_account',
          JSON.stringify({
            id: `test-${email.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
            name: testName,
            email: email.toLowerCase(),
            status: 'paid',
            createdAt: new Date().toISOString(),
            paidExpiryDate: expiry.toISOString(),
          }),
        );
        localStorage.setItem('bh_papirfinder_user_logged_in', 'true');
        navigate('/dashboard');
        return;
      }

      setError(authError?.message || t('authPage.invalidCredentials'));
    } catch {
      setError(t('authPage.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
              {t('common.back')}
            </Button>
          </div>
          <CardTitle className="text-xl sm:text-2xl text-[#003D7A] flex items-center gap-2">
            <LogIn className="h-6 w-6 flex-shrink-0" />
            <span className="break-words">{t('nav.login')}</span>
          </CardTitle>
          <CardDescription className="break-words">{t('authPage.loginDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription className="break-words">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('authPage.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="vas@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('common.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('authPage.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 break-words">{t('authPage.passwordHint')}</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#003D7A] hover:bg-[#002A5A]"
              disabled={loading}
            >
              {loading ? t('auth.loggingIn') : t('auth.loginButton')}
            </Button>

            <div className="text-center text-sm text-gray-600 break-words">
              {t('auth.noAccount')}{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-[#003D7A] font-semibold hover:underline"
              >
                {t('authPage.registerLink')}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;