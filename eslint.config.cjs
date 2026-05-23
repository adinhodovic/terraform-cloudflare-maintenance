module.exports = [
  {
    files: ['maintenance.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        addEventListener: 'readonly',
        WHITELIST_IPS: 'readonly',
        WHITELIST_PATH: 'readonly',
        google_font: 'readonly',
        favicon_url: 'readonly',
        font: 'readonly',
        logo_url: 'readonly',
        company_name: 'readonly',
        info_html: 'readonly',
        statuspage_url: 'readonly',
        image_url: 'readonly',
        email: 'readonly'
      }
    }
  }
];