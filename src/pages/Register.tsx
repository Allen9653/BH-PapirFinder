import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, ArrowLeft, Gift, Mail, Shield, Globe, CheckCircle } from 'lucide-react';
import { signUpUser, resendConfirmation } from '@/lib/supabaseClient';
import { recordRegistrationIP, checkIPRegistrationLimit } from '@/lib/ip-registration';
import { trackUserActivity } from '@/lib/user-activity';

/**
 * Provjerava jačinu lozinke: minimalno 8 znakova, barem jedno slovo i jedan broj.
 * Vraća prevodni ključ greške kako bi poruka bila lokalizirana.
 */
function validatePassword(password: string): { valid: boolean; errorKey: string } {
  if (password.length < 8) {
    return { valid: false, errorKey: 'authPage.errPasswordLength' };
  }
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  if (!hasNumber || !hasLetter) {
    return { valid: false, errorKey: 'authPage.errPasswordComplexity' };
  }
  return { valid: true, errorKey: '' };
}

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ipInfo, setIpInfo] = useState<{ country?: string; city?: string } | null>(null);
  const [emailConfirmationNote, setEmailConfirmationNote] = useState(false);
  const [emailSendFailed, setEmailSendFailed] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');

  const handleResend = async () => {
    setResending(true);
    setResendMsg('');
    const { error: resendError } = await resendConfirmation(email);
    setResending(false);
    if (resendError) {
      setEmailSendFailed(true);
      setResendMsg(t('authPage.resendFailed'));
    } else {
      setEmailSendFailed(false);
      setError('');
      setResendMsg(t('authPage.resendOk'));
    }
  };

  const finishSuccess = async (needsConfirmation: boolean, method: string) => {
    setSuccess(true);
    setEmailConfirmationNote(needsConfirmation);
    const record = await recordRegistrationIP(email);
    setIpInfo({ country: record.country, city: record.city });
    trackUserActivity('register', { email, method });
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError(t('authPage.errFillAll'));
        setLoading(false);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError(t('authPage.errInvalidEmail'));
        setLoading(false);
        return;
      }

      const passwordCheck = validatePassword(password);
      if (!passwordCheck.valid) {
        setError(t(passwordCheck.errorKey));
        setLoading(false);
        return;
      }

      const ipCheck = await checkIPRegistrationLimit(5);
      if (!ipCheck.allowed) {
        setError(ipCheck.reason || t('authPage.errTooManyAttempts'));
        setLoading(false);
        return;
      }

      const { data, error: authError } = await signUpUser(email, password, name);

      if (authError) {
        const message = authError.message || '';

        if (message.includes('already registered') || message.includes('already been registered')) {
          setError(t('authPage.errUserExists'));
        } else if (message.includes('rate limit')) {
          setError(t('authPage.errRateLimit'));
        } else if (message.includes('captcha')) {
          setError(t('authPage.errCaptcha'));
        } else if (message.includes('Database error') || message.includes('database')) {
          // Korisnik je kreiran u Auth-u, ali trigger za profil nije prošao — tretiraj kao uspjeh
          console.warn('User created but profile trigger may have failed:', message);
          await finishSuccess(true, 'supabase_partial');
          return;
        } else if (message.includes('Password should be')) {
          setError(t('authPage.errPasswordComplexity'));
        } else if (message.includes('sending confirmation')) {
          console.error('Email confirmation sending failed:', message);
          setEmailSendFailed(true);
          setError(t('authPage.errEmailSendFailed'));
          trackUserActivity('register', { email, method: 'supabase_email_failed' });
        } else if (message.includes('Email not confirmed') || message.includes('email')) {
          setError(t('authPage.errEmailConfirm'));
        } else {
          setError(t('authPage.errRegisterWithMsg', { message }));
        }
        setLoading(false);
        return;
      }

      const needsConfirmation =
        data?.user?.identities?.length === 0 || Boolean(data?.user && !data?.session);

      await finishSuccess(needsConfirmation, 'supabase');
    } catch (err) {
      console.error('Registration error:', err);
      setError(t('authPage.errGeneric'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003D7A] to-[#00A651] text-white py-14 sm:py-16">
        <div className="container px-4">
          <div className="max-w-md mx-auto text-center">
            <UserPlus className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 break-words">
              {t('nav.register')}
            </h1>
            <p className="text-base sm:text-lg text-gray-100 break-words">
              {t('authPage.registerHeroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Forma */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-[#003D7A] hover:text-[#003D7A]/80"
              >
                <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
                {t('searchPage.backHome')}
              </Button>
            </div>

            {success ? (
              <Card className="border-green-200 shadow-lg">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-green-800 break-words">
                    {t('authPage.successTitle')}
                  </CardTitle>
                  <CardDescription className="text-green-700 text-base mt-2 break-words">
                    {emailConfirmationNote
                      ? t('authPage.successConfirmEmail')
                      : t('authPage.successActive')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emailConfirmationNote && (
                    <div className="space-y-2">
                      <Button type="button" variant="outline" className="w-full !bg-transparent" disabled={resending} onClick={handleResend}>
                        <Mail className="h-4 w-4 mr-2" />
                        {resending ? t('authPage.resending') : t('authPage.resendEmail')}
                      </Button>
                      {resendMsg && <p className="text-sm text-center break-words">{resendMsg}</p>}
                    </div>
                  )}
                  {emailConfirmationNote ? (
                    <Alert className="bg-green-50 border-green-200">
                      <AlertDescription className="text-green-900 break-words">
                        <Mail className="h-4 w-4 inline mr-2" />
                        <strong>{t('authPage.checkEmailStrong')}</strong>{' '}
                        {t('authPage.checkEmailBody')}
                        <br />
                        <br />
                        <span className="text-sm">{t('authPage.noEmailContact')}</span>
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="bg-green-50 border-green-200">
                      <AlertDescription className="text-green-900 break-words">
                        <CheckCircle className="h-4 w-4 inline mr-2" />
                        <strong>{t('authPage.accountActiveStrong')}</strong>{' '}
                        {t('authPage.accountActiveBody')}
                      </AlertDescription>
                    </Alert>
                  )}

                  {ipInfo && (ipInfo.country || ipInfo.city) && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800 break-words">
                        <strong>{t('authPage.registrationLocation')}:</strong>{' '}
                        {[ipInfo.city, ipInfo.country].filter(Boolean).join(', ')}
                        <br />
                        <span className="text-xs text-blue-600">
                          {t('authPage.loginAnyDevice')}
                        </span>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    className="w-full bg-[#003D7A] hover:bg-[#002D5A]"
                    onClick={() => navigate('/login')}
                  >
                    {t('authPage.goToLogin')}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#003D7A] break-words">
                    {t('authPage.createAccountTitle')}
                  </CardTitle>
                  <CardDescription className="break-words">
                    {t('authPage.createAccountDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription className="break-words">{error}</AlertDescription>
                      </Alert>
                    )}
                    {emailSendFailed && email && (
                      <div className="space-y-2">
                        <Button type="button" variant="outline" className="w-full !bg-transparent" disabled={resending} onClick={handleResend}>
                          <Mail className="h-4 w-4 mr-2" />
                          {resending ? t('authPage.resending') : t('authPage.resendEmail')}
                        </Button>
                        {resendMsg && <p className="text-sm text-center break-words">{resendMsg}</p>}
                      </div>
                    )}

                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertDescription className="text-blue-900 break-words">
                        <Gift className="h-4 w-4 inline mr-2" />
                        <strong>{t('authPage.trialStrong')}</strong> {t('authPage.trialBody')}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="name">{t('common.fullName')}</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('auth.namePlaceholder')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

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
                        placeholder={t('authPage.passwordMinPlaceholder')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <div className="flex items-start gap-2 mt-1">
                        <Shield className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-500 break-words">
                          {t('authPage.passwordRule')}
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#00A651] hover:bg-[#008F45] text-white"
                      disabled={loading}
                    >
                      {loading ? t('auth.registering') : t('authPage.registerFreeButton')}
                    </Button>

                    <div className="border-t pt-4 mt-4 space-y-2">
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="break-words">{t('authPage.benefitIps')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="break-words">{t('authPage.benefitDevices')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="break-words">{t('authPage.benefitTrial')}</span>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 break-words">
                      {t('auth.hasAccount')}{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-[#003D7A] font-semibold hover:underline"
                      >
                        {t('authPage.loginLink')}
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;