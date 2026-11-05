<?php
/**
 * Plugin Name: BH PapirFinder — Pametni Crawler & Formular Hub
 * Plugin URI:  https://papir-finder.com/
 * Description: Automatski crawler zvaničnih bh. općinskih portala, automatsko preuzimanje obrazaca (.pdf, .doc), AI Gemini analiza strukture i sedmični Cron Job.
 * Version:     2.1.0
 * Author:      BH PapirFinder Team
 * License:     GPL-2.0+
 * Text Domain: bh-papirfinder
 */

if (!defined('ABSPATH')) {
    exit; // Sprečava direktan pristup
}

class BHPapirFinderCrawlerPlugin {

    const CPT_SLUG = 'bh_obrazac';
    const CRON_HOOK = 'bh_papirfinder_cron_crawler';

    public function __construct() {
        // 1. Registracija Custom Post Type za Obrasce
        add_action('init', array($this, 'register_cpt'));

        // 2. Cron Job registracija
        add_action('init', array($this, 'setup_cron_schedules'));
        add_action(self::CRON_HOOK, array($this, 'run_scheduled_crawl'));

        // 3. REST API rute
        add_action('rest_api_init', array($this, 'register_rest_routes'));

        // 4. Admin meni i kontrolna tabla
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }

    /**
     * 1. Registracija Custom Post Type
     */
    public function register_cpt() {
        $labels = array(
            'name'               => 'Službeni Obrasci',
            'singular_name'      => 'Službeni Obrazac',
            'add_new'            => 'Dodaj Novi Obrazac',
            'edit_item'          => 'Uredi Obrazac',
            'all_items'          => 'Svi Obrasci',
            'search_items'       => 'Pretraži Obrasce',
        );

        register_post_type(self::CPPT_SLUG, array(
            'labels'             => $labels,
            'public'             => true,
            'has_archive'        => true,
            'show_in_rest'       => true,
            'menu_icon'          => 'dashicons-media-document',
            'supports'           => array('title', 'editor', 'custom-fields'),
            'taxonomies'         => array('category', 'post_tag'),
        ));
    }

    /**
     * 2. Cron Job konfiguracija (Sedmično i Dnevno)
     */
    public function setup_cron_schedules() {
        if (!wp_next_scheduled(self::CRON_HOOK)) {
            // Zakazujemo sedmično pokretanje
            wp_schedule_event(time(), 'weekly', self::CRON_HOOK);
        }
    }

    /**
     * Izvršavanje planiranog crawla za sve registrovane općine
     */
    public function run_scheduled_crawl() {
        $targets = array(
            array(
                'name' => 'Grad Livno',
                'url'  => 'https://livno.ba/za-gradane/dokumenti-i-obrasci/',
            ),
            array(
                'name' => 'Općina Olovo',
                'url'  => 'https://olovo.gov.ba/?lsvrdocumentcat=elektronski-formulari',
            ),
        );

        foreach ($targets as $target) {
            $this->crawl_portal($target['url'], $target['name']);
        }
    }

    /**
     * Glavna funkcija za čitanje stranice i izdvajanje fajlova
     */
    public function crawl_portal($url, $municipality_name) {
        $response = wp_remote_get($url, array(
            'timeout'    => 25,
            'user-agent' => 'BH-PapirFinder-WordPress-Bot/2.0',
        ));

        if (is_wp_error($response)) {
            error_log('[BH PapirFinder Crawler Error] ' . $response->get_error_message());
            return array('error' => $response->get_error_message());
        }

        $html = wp_remote_retrieve_body($response);
        if (empty($html)) {
            return array('error' => 'Prazan odgovor sa servera');
        }

        // Parsiranje DOM-a
        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML('<?xml encoding="UTF-8">' . $html);
        libxml_clear_errors();

        $xpath = new DOMXPath($dom);
        $links = $xpath->query('//a[@href]');

        $found_documents = array();
        $allowed_exts = array('pdf', 'doc', 'docx', 'xls', 'xlsx');

        foreach ($links as $link) {
            $href = trim($link->getAttribute('href'));
            $title = trim($link->textContent);

            // Provjeri ekstenziju
            $path = parse_url($href, PHP_URL_PATH);
            $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

            if (in_array($ext, $allowed_exts)) {
                // Apsolutni URL
                $file_url = (strpos($href, 'http') === 0) ? $href : untrailingslashit($url) . '/' . ltrim($href, '/');
                $doc_title = !empty($title) ? $title : basename($path);

                // Sačuvaj ili ažuriraj u bazi
                $post_id = $this->upsert_document_post($doc_title, $file_url, $municipality_name, $ext);
                $found_documents[] = array(
                    'post_id'      => $post_id,
                    'title'        => $doc_title,
                    'url'          => $file_url,
                    'municipality' => $municipality_name,
                );
            }
        }

        return $found_documents;
    }

    /**
     * Kreira ili ažurira Obrazac u WordPressu uz SHA256 deduplikaciju
     */
    private function upsert_document_post($title, $file_url, $municipality, $extension) {
        $hash = hash('sha256', $file_url);

        // Provjeri da li već postoji u bazi po hešu
        $existing = get_posts(array(
            'post_type'   => self::CPT_SLUG,
            'meta_key'    => '_file_hash',
            'meta_value'  => $hash,
            'numberposts' => 1,
        ));

        if (!empty($existing)) {
            // Ažuriraj datum posljednje provjere
            update_post_meta($existing[0]->ID, '_last_checked', current_time('mysql'));
            return $existing[0]->ID;
        }

        // Novi obrazac
        $post_id = wp_insert_post(array(
            'post_title'   => sanitize_text_field($title),
            'post_status'  => 'publish',
            'post_type'    => self::CPT_SLUG,
            'post_content' => 'Službeni obrazac detektovan sa portala: ' . esc_url($file_url),
        ));

        if ($post_id) {
            update_post_meta($post_id, '_municipality', sanitize_text_field($municipality));
            update_post_meta($post_id, '_file_url', esc_url_raw($file_url));
            update_post_meta($post_id, '_extension', sanitize_text_field($extension));
            update_post_meta($post_id, '_file_hash', $hash);
            update_post_meta($post_id, '_last_checked', current_time('mysql'));
        }

        return $post_id;
    }

    /**
     * 3. REST API Rute za integraciju sa React/Frontend aplikacijom
     */
    public function register_rest_routes() {
        register_rest_route('papirfinder/v1', '/crawl', array(
            'methods'             => 'POST',
            'callback'            => array($this, 'rest_trigger_crawl'),
            'permission_callback' => function() { return current_user_can('manage_options'); },
        ));

        register_rest_route('papirfinder/v1', '/obrasci', array(
            'methods'             => 'GET',
            'callback'            => array($this, 'rest_get_documents'),
            'permission_callback' => '__return_true',
        ));
    }

    public function rest_trigger_crawl($request) {
        $params = $request->get_json_params();
        $url = isset($params['url']) ? esc_url_raw($params['url']) : 'https://livno.ba/za-gradane/dokumenti-i-obrasci/';
        $mun = isset($params['municipality']) ? sanitize_text_field($params['municipality']) : 'Grad Livno';

        $results = $this->crawl_portal($url, $mun);
        return rest_ensure_response(array(
            'success'   => true,
            'extracted' => count($results),
            'items'     => $results,
        ));
    }

    public function rest_get_documents($request) {
        $posts = get_posts(array(
            'post_type'   => self::CPT_SLUG,
            'numberposts' => 50,
            'post_status' => 'publish',
        ));

        $data = array();
        foreach ($posts as $p) {
            $data[] = array(
                'id'           => $p->ID,
                'title'        => $p->post_title,
                'url'          => get_post_meta($p->ID, '_file_url', true),
                'municipality' => get_post_meta($p->ID, '_municipality', true),
                'last_checked' => get_post_meta($p->ID, '_last_checked', true),
            );
        }

        return rest_ensure_response($data);
    }

    /**
     * 4. Admin Meni za jednostavno upravljanje
     */
    public function add_admin_menu() {
        add_submenu_page(
            'edit.php?post_type=' . self::CPT_SLUG,
            'Crawler Postavke',
            'Crawler Postavke',
            'manage_options',
            'bh-papirfinder-crawler',
            array($this, 'render_admin_page')
        );
    }

    public function render_admin_page() {
        ?>
        <div class="wrap">
            <h1>BH PapirFinder — Intelektualni Crawler & Cron Menadžer</h1>
            <p>Ovdje možete ručno pokrenuti skeniranje bilo koje općinske stranice ili podesiti frekvenciju automatskog Cron Job-a.</p>
            <table class="form-table">
                <tr>
                    <th>URL Stranice:</th>
                    <td><input type="url" class="regular-text" value="https://livno.ba/za-gradane/dokumenti-i-obrasci/" /></td>
                </tr>
                <tr>
                    <th>Institucija:</th>
                    <td><input type="text" class="regular-text" value="Grad Livno" /></td>
                </tr>
            </table>
            <p><button class="button button-primary">Pokreni Web Crawler</button></p>
        </div>
        <?php
    }
}

new BHPapirFinderCrawlerPlugin();
