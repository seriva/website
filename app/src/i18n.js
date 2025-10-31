// Internationalization (i18n) module

export const i18n = {
	currentLanguage: null,
	translations: {},

	init(config, translations) {
		this.currentLanguage = config?.defaultLanguage || "en";
		this.translations = translations || {};
	},

	t(key, lang = null) {
		const language = lang || this.currentLanguage;
		const languageTranslations = this.translations[language];

		if (!languageTranslations) {
			return key;
		}

		// Direct lookup for flat translation keys
		return languageTranslations[key] || key;
	},
};
