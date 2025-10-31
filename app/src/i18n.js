// ===========================================
// INTERNATIONALIZATION (i18n)
// ===========================================
// Translation system for multi-language support

export const i18n = {
	currentLanguage: null,
	translations: {},

	// Initialize i18n with config and translations
	init(config, translations) {
		this.currentLanguage = config?.defaultLanguage || "en";
		this.translations = translations || {};
	},

	// Translate a key to current language (or specified language)
	t(key, lang = null) {
		const language = lang || this.currentLanguage;
		const languageTranslations = this.translations[language];

		if (!languageTranslations) {
			return key;
		}

		return languageTranslations[key] || key;
	},
};
