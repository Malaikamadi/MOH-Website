/**
 * Ministry of Health - Sierra Leone
 * Multi-Language Translation System
 * Supports: English (en), French (fr), Arabic (ar), Krio (kr)
 */

class Translator {
    constructor() {
        this.currentLang = localStorage.getItem('mohLang') || 'en';
        this.translations = {};
        this.rtlLanguages = ['ar'];
        this.init();
    }

    async init() {
        // Load all translations
        await this.loadTranslations();

        // Apply saved language
        this.setLanguage(this.currentLang);

        // Setup language switcher events
        this.setupLanguageSwitcher();
    }

    async loadTranslations() {
        const languages = ['en', 'fr', 'ar', 'kr'];

        // Determine the base path based on the current location
        const isFileProtocol = window.location.protocol === 'file:';

        for (const lang of languages) {
            try {
                // For file:// protocol, we need to use a different approach
                // First try fetch with relative path
                let response;
                try {
                    response = await fetch(`js/lang/${lang}.json`);
                } catch (e) {
                    // If relative path fails, try with ./ prefix
                    response = await fetch(`./js/lang/${lang}.json`);
                }

                if (response.ok) {
                    this.translations[lang] = await response.json();
                }
            } catch (error) {
                console.warn(`Could not load ${lang} translations:`, error);
                // Fallback: try loading from embedded translations if available
                if (window.embeddedTranslations && window.embeddedTranslations[lang]) {
                    this.translations[lang] = window.embeddedTranslations[lang];
                }
            }
        }

        // If no translations loaded, use embedded fallback
        if (Object.keys(this.translations).length === 0 && window.embeddedTranslations) {
            this.translations = window.embeddedTranslations;
        }
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not available, falling back to English`);
            lang = 'en';
        }

        this.currentLang = lang;
        localStorage.setItem('mohLang', lang);

        // Handle RTL languages
        if (this.rtlLanguages.includes(lang)) {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.body.classList.remove('rtl');
        }

        // Update all translatable elements
        this.translatePage();

        // Update language switcher display
        this.updateLanguageSwitcherDisplay(lang);
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);

            if (translation) {
                // Check if it's an input placeholder
                if (element.hasAttribute('data-i18n-placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }

        return value;
    }

    setupLanguageSwitcher() {
        const langOptions = document.querySelectorAll('.lang-option');

        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                this.setLanguage(lang);

                // Close dropdown
                const dropdown = document.getElementById('langDropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }

                // Show notification
                this.showNotification(lang);
            });
        });
    }

    updateLanguageSwitcherDisplay(lang) {
        // Update the button text
        const langBtn = document.querySelector('.lang-btn span:not(.fa)');
        if (langBtn) {
            const langCodes = { 'en': 'EN', 'fr': 'FR', 'ar': 'AR', 'kr': 'KR' };
            langBtn.textContent = langCodes[lang] || 'EN';
        }

        // Update active state
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    showNotification(lang) {
        const langNames = {
            'en': 'English',
            'fr': 'Français',
            'ar': 'العربية',
            'kr': 'Krio'
        };

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'lang-notification';
        notification.innerHTML = `
            <i class="fas fa-globe"></i>
            <span>Language changed to ${langNames[lang]}</span>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize translator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.translator = new Translator();
});

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .lang-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #004684 0%, #004684 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 10000;
    }

    .lang-notification.show {
        transform: translateX(0);
    }

    .lang-notification i {
        color: #d4a855;
        font-size: 1.25rem;
    }

    /* RTL Support */
    body.rtl {
        direction: rtl;
        text-align: right;
    }

    body.rtl .lang-notification {
        right: auto;
        left: 20px;
        transform: translateX(-120%);
    }

    body.rtl .lang-notification.show {
        transform: translateX(0);
    }

    body.rtl .header-nav-content {
        flex-direction: row-reverse;
    }

    body.rtl .nav-menu {
        flex-direction: row-reverse;
    }

    body.rtl .dropdown-menu {
        left: auto;
        right: 0;
    }

    body.rtl .jobs-search-box {
        direction: rtl;
    }

    body.rtl .search-field .input-wrapper i {
        left: auto;
        right: 1rem;
    }

    body.rtl .search-field input,
    body.rtl .search-field select {
        padding-left: 1rem;
        padding-right: 2.75rem;
        text-align: right;
    }

    body.rtl .job-card {
        text-align: right;
    }

    body.rtl .job-meta {
        flex-direction: row-reverse;
    }

    body.rtl .footer-grid {
        direction: rtl;
    }
`;
document.head.appendChild(notificationStyles);
