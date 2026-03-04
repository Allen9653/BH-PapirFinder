<?php
  /**
   * Plugin Name: BH_Papirfinder
   * Plugin URI: https://bh-assistant.ba/bh_papirfinder
   * Description: BH PapirFinder – WordPress Plugin
Opis:  
BH PapirFinder je digitalni alat dizajniran da korisnicima olakša pristup službenim dokumentima i obrascima javnih institucija u Bosni i Hercegovini. Plugin automatski pronalazi zvanične web stranice općina, kantona, distrikta, ministarstava i entiteta, zatim prezentira korisniku listu besplatnih formulara i obrazaca dostupnih za preuzimanje, bez potrebe da fizički odlazi u instituciju.

🔧 Ključne funkcionalnosti
Automatsko pronalaženje web stranica institucija (općine, kantoni, ministarstva, entiteti).

Prezentacija dostupnih obrazaca – plugin prikazuje listu besplatnih formulara i obrazaca sa zvaničnih web stranica.

Preuzimanje dokumenata – korisnik može direktno skinuti obrazac na svoj uređaj preko BH PapirFinder interfejsa.

Multijezičnost:

Bosanski (latinica i ćirilica)

Engleski

Njemački

Turski

Post-download opcije:

Prevod dokumenta

Dijeljenje (share)

Uređivanje (edit)

Printanje

🎨 User Experience
Jednostavan i intuitivan interfejs.

Višejezična podrška sa automatskim prebacivanjem pisma (latinica/ćirilica).

Centralizovan pristup svim obrascima bez potrebe za ručnim pretraživanjem web stranica institucija.

🛡 Sigurnost i pouzdanost
Svi dokumenti se preuzimaju direktno sa zvaničnih web stranica institucija.

Transparentan prikaz izvora (link ka originalnoj stranici).

Zaštita korisničkih podataka u skladu sa Zakonom o zaštiti ličnih podataka FBiH.

🎯 Cilj
BH PapirFinder spaja digitalnu praktičnost, multijezičnu dostupnost i kulturnu inkluzivnost u jedinstvenom WordPress pluginu. Namijenjen je građanima, studentima, pravnicima i svim korisnicima koji žele brži i sigurniji pristup službenim obrascima bez birokratskih komplikacija. Monetizacija – BH PapirFinder
Model naplate:

Cijena licence: 80 BAM za 12 mjeseci korištenja.

Način plaćanja: PayPal integracija → račun: alenjusufovic@yahoo.com.

Licenciranje: Nakon instalacije plugina, korisnik dobija trial period (npr. 7 dana besplatno). Nakon isteka, mora aktivirati licencu uplatom.
Uslovi korištenja (Terms of Use)

Poseban modul ili stranica u pluginu gdje korisnik mora prihvatiti uslove prije korištenja.

Može se prikazati kao modal popup nakon instalacije ili kao link u footeru.

Uputstvo (Tutorial / Help)

Sekcija u Admin panelu sa multimedijalnim objašnjenjem:

Kako se koristi plugin

Kako se uplaćuje licenca (PayPal)

Kako se preuzimaju i prevode obrasci

Možeš dodati i video tutorial ili PDF vodič.

Podrška (Support)

Link ili forma u Admin panelu → korisnik može poslati upit direktno tebi (email: info@scenapio.art ili drugi).

Možeš dodati i FAQ sekciju za najčešća pitanja.

Licensing & Monetization

Već si definisao: 80 BAM / 12 mjeseci preko PayPal-a.

Treba dodati trial period (npr. 7 dana besplatno).

Admin panel mora imati status licence (aktivna / istekla / trial).
Plugin Settings – BH PapirFinder
🔹 1. General Settings
Trial period (slider):

Vrijednost: 0–30 dana

Default: 7 dana

License duration (input field):

Vrijednost: 12 mjeseci (fiksno)

Price (input field):

Default: 80 BAM

Currency: BAM (možeš dodati opciju za USD/EUR kasnije)

🔹 2. Language Settings
Enable Latinica/Ćirilica (toggle switch)

Enable English/German/Turkish (checkboxes)

Default language (dropdown)

🔹 3. Document Settings
Institution filter (checkboxes):

Općine

Kantoni

Distrikti

Ministarstva

Entiteti

Auto-download forms (toggle switch):

On → automatski preuzima dostupne obrasce

Off → korisnik ručno bira

🔹 4. User Options
Enable Translate (toggle)

Enable Share (toggle)

Enable Edit (toggle)

Enable Print (toggle)

🔹 5. Payment Settings
PayPal Email (input field):

Default: alenjusufovic@yahoo.com

Currency (dropdown): BAM, USD, EUR

Renewal reminder (slider):

Vrijednost: 1–30 dana prije isteka licence

Default: 7 dana

🔹 6. Support & Legal
Terms of Use (link field) → URL ka tvojoj stranici sa uslovima korištenja

Tutorial/Help (textarea) → kratko uputstvo ili embed video link

Support Email (input field) → info@bh-assistant.ba
   * Version: 1.0.0
   * Author: Alen Jusufovic
   * Author URI: https://bh-assistant.ba
   * License: GPL-2.0+
   * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
   * Text Domain: bhpapirfinder
   * Domain Path: /Bosnian
   */
  
  // If this file is called directly, abort.
  if (!defined('WPINC')) {
      die;
  }
  
  define('BHPAPIRFINDER_VERSION', '1.0.0');
  define('BHPAPIRFINDER_PLUGIN_DIR', plugin_dir_path(__FILE__));
  define('BHPAPIRFINDER_PLUGIN_URL', plugin_dir_url(__FILE__));
  
  
  function activate_bhpapirfinder() {
      require_once BHPAPIRFINDER_PLUGIN_DIR . 'includes/class-activator.php';
      Bhpapirfinder_Activator::activate();
  }
  register_activation_hook(__FILE__, 'activate_bhpapirfinder');
  
  
  
  function deactivate_bhpapirfinder() {
      require_once BHPAPIRFINDER_PLUGIN_DIR . 'includes/class-deactivator.php';
      Bhpapirfinder_Deactivator::deactivate();
  }
  register_deactivation_hook(__FILE__, 'deactivate_bhpapirfinder');
  
  
  require BHPAPIRFINDER_PLUGIN_DIR . 'includes/class-plugin.php';
  
  function run_bhpapirfinder() {
      $plugin = new Bhpapirfinder_Plugin();
      $plugin->run();
  }
  run_bhpapirfinder();
  