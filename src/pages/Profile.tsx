import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, User, Mail, Calendar, Shield, Save, CheckCircle, Clock } from 'lucide-react';
import { supabase, getCurrentUser } from '@/lib/supabaseClient';
import { getUserAccount } from '@/lib/trial';
import { getSubscriptionType, getSubscriptionRemainingDays } from '@/lib/subscription';
import { getLocalActivity } from '@/lib/user-activity';

const Profile = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [subscriptionInfo, setSubscriptionInfo] = useState<{
    type: string;
    daysRemaining: number;
  } | null>(null);
  const [recentActivity, setRecentActivity] = useState<{ action: string; created_at: string }[]>([]);

  useEffect(() => {
    loadProfile();
    loadSubscriptionInfo();
    loadRecentActivity();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const { user } = await getCurrentUser();
      if (user) {
        setEmail(user.email || '');
        setFullName(user.user_metadata?.full_name || '');
      } else {
        // Fallback to localStorage account
        const account = getUserAccount();
        if (account) {
          setEmail(account.email);
          setFullName(account.name);
        } else {
          navigate('/login');
          return;
        }
      }
    } catch {
      const account = getUserAccount();
      if (account) {
        setEmail(account.email);
        setFullName(account.name);
      }
    }
    setLoading(false);
  };

  const loadSubscriptionInfo = () => {
    const type = getSubscriptionType();
    const daysRemaining = getSubscriptionRemainingDays();
    setSubscriptionInfo({ type, daysRemaining });
  };

  const loadRecentActivity = () => {
    const activities = getLocalActivity();
    setRecentActivity(activities.slice(0, 10));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { user } = await getCurrentUser();
      if (user) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { full_name: fullName },
        });

        if (updateError) {
          setError('Greška pri ažuriranju profila: ' + updateError.message);
        } else {
          setSuccess('Profil uspješno ažuriran!');
          // Also update user_profiles table
          await supabase.from('user_profiles').upsert({
            user_id: user.id,
            full_name: fullName,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });
        }
      } else {
        // Update localStorage account
        const account = getUserAccount();
        if (account) {
          account.name = fullName;
          localStorage.setItem('bh_papirfinder_user_account', JSON.stringify(account));
          setSuccess('Profil uspješno ažuriran!');
        }
      }
    } catch {
      setError('Neočekivana greška. Pokušajte ponovo.');
    }

    setSaving(false);
  };

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (resetError) {
        setError('Greška pri slanju linka za promjenu lozinke: ' + resetError.message);
      } else {
        setSuccess('Link za promjenu lozinke je poslan na vaš email!');
      }
    } catch {
      setError('Neočekivana greška. Pokušajte ponovo.');
    }
  };

  const getSubscriptionLabel = (type: string): string => {
    switch (type) {
      case 'paid': return 'Aktivna pretplata';
      case 'trial': return 'Probni period';
      case 'expired': return 'Istekla';
      default: return 'Neaktivna';
    }
  };

  const getSubscriptionColor = (type: string): string => {
    switch (type) {
      case 'paid': return 'text-green-600';
      case 'trial': return 'text-blue-600';
      case 'expired': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatActivityAction = (action: string): string => {
    const labels: Record<string, string> = {
      page_view: 'Pregled stranice',
      search: 'Pretraga',
      form_view: 'Pregled obrasca',
      register: 'Registracija',
      login: 'Prijava',
      subscription: 'Pretplata',
    };
    return labels[action] || action;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Učitavanje profila...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#003D7A] to-[#00A651] text-white py-12">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <User className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Moj profil</h1>
            <p className="text-gray-100">Upravljajte vašim nalogom i postavkama</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-[#003D7A] hover:text-[#003D7A]/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazad na početnu
            </Button>

            {/* Profile Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Lični podaci
                </CardTitle>
                <CardDescription>Ažurirajte vaše ime i kontakt informacije</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">Ime i prezime</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Vaše ime i prezime"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email adresa</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      value={email}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Email adresa se ne može promijeniti</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-[#003D7A] hover:bg-[#002D5A]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Čuvanje...' : 'Sačuvaj promjene'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleChangePassword}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Promijeni lozinku
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Status Card */}
            {subscriptionInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Status pretplate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className={`font-semibold ${getSubscriptionColor(subscriptionInfo.type)}`}>
                        {getSubscriptionLabel(subscriptionInfo.type)}
                      </p>
                      {subscriptionInfo.daysRemaining > 0 && (
                        <p className="text-sm text-gray-600">
                          Preostalo: {subscriptionInfo.daysRemaining} dana
                        </p>
                      )}
                    </div>
                    {(subscriptionInfo.type === 'expired' || subscriptionInfo.type === 'none') && (
                      <Button
                        onClick={() => navigate('/subscription')}
                        className="bg-[#00A651] hover:bg-[#008F45]"
                      >
                        Pretplati se
                      </Button>
                    )}
                    {subscriptionInfo.type === 'trial' && (
                      <Button
                        onClick={() => navigate('/subscription')}
                        variant="outline"
                      >
                        Nadogradi
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Nedavna aktivnost
                </CardTitle>
                <CardDescription>Vaše posljednje akcije na platformi</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <p className="text-gray-500 text-sm">Nema zabilježene aktivnosti.</p>
                ) : (
                  <div className="space-y-2">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <span className="text-sm font-medium">
                          {formatActivityAction(activity.action)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.created_at).toLocaleDateString('bs-BA', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;