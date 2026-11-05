import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Bell, Mail, Smartphone, CheckCircle, Globe } from 'lucide-react';
import Footer from '@/components/Footer';
import {
  getNotificationPreferences,
  saveNotificationPreferences,
  loadPreferencesFromSupabase,
  requestPushPermission,
  type NotificationPreferences as NotifPrefs,
} from '@/lib/notification-preferences';
import { getCurrentUser } from '@/lib/supabaseClient';

const NotificationPreferences = () => {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<NotifPrefs>(getNotificationPreferences());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pushPermission, setPushPermission] = useState<string>('default');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status and load from Supabase if available
    const init = async () => {
      const { user } = await getCurrentUser();
      setIsLoggedIn(!!user);

      if (user) {
        const supaPrefs = await loadPreferencesFromSupabase();
        if (supaPrefs) {
          setPrefs(supaPrefs);
        } else {
          // Set email from user profile
          setPrefs((prev) => ({ ...prev, email: user.email || prev.email }));
        }
      }

      // Check push notification permission
      if ('Notification' in window) {
        setPushPermission(Notification.permission);
      }
    };

    init();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveNotificationPreferences(prefs);
    setSaving(false);

    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handlePushToggle = async (enabled: boolean) => {
    if (enabled) {
      const permission = await requestPushPermission();
      setPushPermission(permission);
      if (permission === 'granted') {
        setPrefs((prev) => ({ ...prev, pushNotifications: true }));
      }
    } else {
      setPrefs((prev) => ({ ...prev, pushNotifications: false }));
    }
  };

  const updatePref = <K extends keyof NotifPrefs>(key: K, value: NotifPrefs[K]) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#003D7A] to-[#00A651] text-white py-12">
        <div className="container px-4">
          <div className="max-w-lg mx-auto text-center">
            <Bell className="h-10 w-10 mx-auto mb-3" />
            <h1 className="text-3xl font-bold mb-2">Postavke obavještenja</h1>
            <p className="text-gray-100">
              Prilagodite kako i kada primate obavještenja o vašim prijavama
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-[#003D7A] hover:text-[#003D7A]/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazad
            </Button>
          </div>

          {!isLoggedIn && (
            <Alert className="mb-6 bg-yellow-50 border-yellow-200">
              <AlertDescription className="text-yellow-800">
                <strong>Napomena:</strong> Prijavite se da biste sačuvali postavke na svim uređajima.
                Trenutno se postavke čuvaju samo na ovom uređaju.
              </AlertDescription>
            </Alert>
          )}

          {saved && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Postavke obavještenja su uspješno sačuvane!
              </AlertDescription>
            </Alert>
          )}

          {/* Email for notifications */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5 text-blue-500" />
                Email za obavještenja
              </CardTitle>
              <CardDescription>
                Na ovu adresu ćete primati obavještenja o statusu vaših prijava
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notif-email">Email adresa</Label>
                <Input
                  id="notif-email"
                  type="email"
                  value={prefs.email}
                  onChange={(e) => updatePref('email', e.target.value)}
                  placeholder="vas@email.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Report Update Notifications */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Obavještenja o prijavama</CardTitle>
              <CardDescription>
                Odaberite koja obavještenja želite primati o vašim prijavama neispravnih linkova
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Promjena statusa prijave</Label>
                  <p className="text-sm text-gray-500">
                    Kada administrator pregleda ili promijeni status vaše prijave
                  </p>
                </div>
                <Switch
                  checked={prefs.reportStatusChanged}
                  onCheckedChange={(val) => updatePref('reportStatusChanged', val)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Link ispravljen</Label>
                  <p className="text-sm text-gray-500">
                    Kada se prijavljeni link ispravi i ponovo funkcioniše
                  </p>
                </div>
                <Switch
                  checked={prefs.reportResolved}
                  onCheckedChange={(val) => updatePref('reportResolved', val)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Sedmični pregled</Label>
                  <p className="text-sm text-gray-500">
                    Sedmični sažetak aktivnosti na vašim prijavama
                  </p>
                </div>
                <Switch
                  checked={prefs.weeklyDigest}
                  onCheckedChange={(val) => updatePref('weeklyDigest', val)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Channels */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Smartphone className="h-5 w-5 text-purple-500" />
                Kanali obavještenja
              </CardTitle>
              <CardDescription>
                Odaberite kako želite primati obavještenja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email obavještenja</Label>
                  <p className="text-sm text-gray-500">
                    Primajte obavještenja putem emaila
                  </p>
                </div>
                <Switch
                  checked={prefs.emailNotifications}
                  onCheckedChange={(val) => updatePref('emailNotifications', val)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push obavještenja (browser)</Label>
                  <p className="text-sm text-gray-500">
                    {pushPermission === 'denied'
                      ? 'Push obavještenja su blokirana u vašem browseru'
                      : 'Primajte obavještenja direktno u browseru'}
                  </p>
                </div>
                <Switch
                  checked={prefs.pushNotifications}
                  onCheckedChange={handlePushToggle}
                  disabled={pushPermission === 'denied'}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">In-app obavještenja</Label>
                  <p className="text-sm text-gray-500">
                    Prikaz obavještenja unutar aplikacije
                  </p>
                </div>
                <Switch
                  checked={prefs.inAppNotifications}
                  onCheckedChange={(val) => updatePref('inAppNotifications', val)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Frequency & Language */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-green-500" />
                Učestalost i jezik
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Učestalost obavještenja</Label>
                <Select
                  value={prefs.notificationFrequency}
                  onValueChange={(val) => updatePref('notificationFrequency', val as NotifPrefs['notificationFrequency'])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Odmah (svako obavještenje pojedinačno)</SelectItem>
                    <SelectItem value="daily">Dnevni sažetak</SelectItem>
                    <SelectItem value="weekly">Sedmični sažetak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Jezik obavještenja</Label>
                <Select
                  value={prefs.notificationLanguage}
                  onValueChange={(val) => updatePref('notificationLanguage', val as NotifPrefs['notificationLanguage'])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bs">Bosanski</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="tr">Türkçe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Otkaži
            </Button>
            <Button
              className="bg-[#003D7A] hover:bg-[#002A5A]"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Čuvanje...' : 'Sačuvaj postavke'}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotificationPreferences;