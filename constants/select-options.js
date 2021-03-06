export const PERMISSIONS = [
	"admin",
	"admin.system",
	"admin.system.stats",
	"admin.user",
	"admin.user.list",
	"admin.user.create",
	"admin.user.delete",
	"admin.user.editOthers"
];

//source: https://msdn.microsoft.com/en-us/library/ee825488(v=cs.20).aspx
export const LANGUAGES = [
	{ value: "af-ZA", label: "Afrikaans - South Africa" },
	//{'value': 'sq-AL', 'label': 'Albanian - Albania'},
	//{'value': 'ar-DZ', 'label': 'Arabic - Algeria'},
	//{'value': 'ar-BH', 'label': 'Arabic - Bahrain'},
	//{'value': 'ar-EG', 'label': 'Arabic - Egypt'},
	//{'value': 'ar-IQ', 'label': 'Arabic - Iraq'},
	//{'value': 'ar-JO', 'label': 'Arabic - Jordan'},
	//{'value': 'ar-KW', 'label': 'Arabic - Kuwait'},
	//{'value': 'ar-LB', 'label': 'Arabic - Lebanon'},
	//{'value': 'ar-LY', 'label': 'Arabic - Libya'},
	{ value: "ar-MA", label: "Arabic - Morocco" },
	//{'value': 'ar-OM', 'label': 'Arabic - Oman'},
	//{'value': 'ar-QA', 'label': 'Arabic - Qatar'},
	//{'value': 'ar-SA', 'label': 'Arabic - Saudi Arabia'},
	//{'value': 'ar-SY', 'label': 'Arabic - Syria'},
	//{'value': 'ar-TN', 'label': 'Arabic - Tunisia'},
	{ value: "ar-AE", label: "Arabic - United Arab Emirates" },
	//{'value': 'ar-YE', 'label': 'Arabic - Yemen'},
	//{'value': 'hy-AM', 'label': 'Armenian - Armenia'},
	//{'value': 'Cy-az-AZ', 'label': 'Azeri (Cyrillic) - Azerbaijan'},
	//{'value': 'Lt-az-AZ', 'label': 'Azeri (Latin) - Azerbaijan'},
	//{'value': 'eu-ES', 'label': 'Basque - Basque'},
	//{'value': 'be-BY', 'label': 'Belarusian - Belarus'},
	//{'value': 'bg-BG', 'label': 'Bulgarian - Bulgaria'},
	//{'value': 'ca-ES', 'label': 'Catalan - Catalan'},
	{ value: "zh-CN", label: "Chinese - China" },
	{ value: "zh-HK", label: "Chinese - Hong Kong SAR" },
	//{'value': 'zh-MO', 'label': 'Chinese - Macau SAR'},
	{ value: "zh-SG", label: "Chinese - Singapore" },
	{ value: "zh-TW", label: "Chinese - Taiwan" },
	//{'value': 'zh-CHS', 'label': 'Chinese (Simplified)'},
	//{'value': 'zh-CHT', 'label': 'Chinese (Traditional)'},
	{ value: "hr-HR", label: "Croatian - Croatia" },
	{ value: "cs-CZ", label: "Czech - Czech Republic" },
	{ value: "da-DK", label: "Danish - Denmark" },
	//{'value': 'div-MV', 'label': 'Dhivehi - Maldives'},
	{ value: "nl-BE", label: "Dutch - Belgium" },
	{ value: "nl-NL", label: "Dutch - The Netherlands" },
	{ value: "en-AU", label: "English - Australia" },
	//{'value': 'en-BZ', 'label': 'English - Belize'},
	{ value: "en-CA", label: "English - Canada" },
	//{'value': 'en-CB', 'label': 'English - Caribbean'},
	{ value: "en-IE", label: "English - Ireland" },
	//{'value': 'en-JM', 'label': 'English - Jamaica'},
	{ value: "en-NZ", label: "English - New Zealand" },
	{ value: "en-PH", label: "English - Philippines" },
	{ value: "en-ZA", label: "English - South Africa" },
	//{'value': 'en-TT', 'label': 'English - Trinidad and Tobago'},
	{ value: "en-GB", label: "English - United Kingdom" },
	{ value: "en-US", label: "English - United States" },
	{ value: "en-ZW", label: "English - Zimbabwe" },
	{ value: "et-EE", label: "Estonian - Estonia" },
	//{'value': 'fo-FO', 'label': 'Faroese - Faroe Islands'},
	//{'value': 'fa-IR', 'label': 'Farsi - Iran'},
	{ value: "fi-FI", label: "Finnish - Finland" },
	{ value: "fr-BE", label: "French - Belgium" },
	{ value: "fr-CA", label: "French - Canada" },
	{ value: "fr-FR", label: "French - France" },
	{ value: "fr-LU", label: "French - Luxembourg" },
	//{'value': 'fr-MC', 'label': 'French - Monaco'},
	{ value: "fr-CH", label: "French - Switzerland" },
	//{'value': 'gl-ES', 'label': 'Galician - Galician'},
	//{'value': 'ka-GE', 'label': 'Georgian - Georgia'},
	{ value: "de-AT", label: "German - Austria" },
	{ value: "de-DE", label: "German - Germany" },
	//{'value': 'de-LI', 'label': 'German - Liechtenstein'},
	{ value: "de-LU", label: "German - Luxembourg" },
	{ value: "de-CH", label: "German - Switzerland" },
	{ value: "el-GR", label: "Greek - Greece" },
	//{'value': 'gu-IN', 'label': 'Gujarati - India'},
	{ value: "he-IL", label: "Hebrew - Israel" },
	//{'value': 'hi-IN', 'label': 'Hindi - India'},
	{ value: "hu-HU", label: "Hungarian - Hungary" },
	//{'value': 'is-IS', 'label': 'Icelandic - Iceland'},
	{ value: "id-ID", label: "Indonesian - Indonesia" },
	{ value: "it-IT", label: "Italian - Italy" },
	{ value: "it-CH", label: "Italian - Switzerland" },
	{ value: "ja-JP", label: "Japanese - Japan" },
	//{'value': 'kn-IN', 'label': 'Kannada - India'},
	//{'value': 'kk-KZ', 'label': 'Kazakh - Kazakhstan'},
	//{'value': 'kok-IN', 'label': 'Konkani - India'},
	//{'value': 'ko-KR', 'label': 'Korean - Korea'},
	//{'value': 'ky-KZ', 'label': 'Kyrgyz - Kazakhstan'},
	{ value: "lv-LV", label: "Latvian - Latvia" },
	{ value: "lt-LT", label: "Lithuanian - Lithuania" },
	//{'value': 'mk-MK', 'label': 'Macedonian (FYROM)'},
	//{'value': 'ms-BN', 'label': 'Malay - Brunei'},
	{ value: "ms-MY", label: "Malay - Malaysia" },
	//{'value': 'mr-IN', 'label': 'Marathi - India'},
	//{'value': 'mn-MN', 'label': 'Mongolian - Mongolia'},
	{ value: "nb-NO", label: "Norwegian (Bokmål) - Norway" },
	{ value: "nn-NO", label: "Norwegian (Nynorsk) - Norway" },
	{ value: "pl-PL", label: "Polish - Poland" },
	{ value: "pt-BR", label: "Portuguese - Brazil" },
	{ value: "pt-PT", label: "Portuguese - Portugal" },
	//{'value': 'pa-IN', 'label': 'Punjabi - India'},
	{ value: "ro-RO", label: "Romanian - Romania" },
	{ value: "ru-RU", label: "Russian - Russia" },
	//{'value': 'sa-IN', 'label': 'Sanskrit - India'},
	//{'value': 'Cy-sr-SP', 'label': 'Serbian (Cyrillic) - Serbia'},
	{ value: "Lt-sr-SP", label: "Serbian (Latin) - Serbia" },
	//{'value': 'sk-SK', 'label': 'Slovak - Slovakia'},
	{ value: "sl-SI", label: "Slovenian - Slovenia" },
	{ value: "es-AR", label: "Spanish - Argentina" },
	//{'value': 'es-BO', 'label': 'Spanish - Bolivia'},
	{ value: "es-CL", label: "Spanish - Chile" },
	{ value: "es-CO", label: "Spanish - Colombia" },
	//{'value': 'es-CR', 'label': 'Spanish - Costa Rica'},
	//{'value': 'es-DO', 'label': 'Spanish - Dominican Republic'},
	{ value: "es-EC", label: "Spanish - Ecuador" },
	//{'value': 'es-SV', 'label': 'Spanish - El Salvador'},
	//{'value': 'es-GT', 'label': 'Spanish - Guatemala'},
	//{'value': 'es-HN', 'label': 'Spanish - Honduras'},
	{ value: "es-MX", label: "Spanish - Mexico" },
	//{'value': 'es-NI', 'label': 'Spanish - Nicaragua'},
	//{'value': 'es-PA', 'label': 'Spanish - Panama'},
	{ value: "es-PY", label: "Spanish - Paraguay" },
	{ value: "es-PE", label: "Spanish - Peru" },
	//{'value': 'es-PR', 'label': 'Spanish - Puerto Rico'},
	{ value: "es-ES", label: "Spanish - Spain" },
	//{'value': 'es-UY', 'label': 'Spanish - Uruguay'},
	//{'value': 'es-VE', 'label': 'Spanish - Venezuela'},
	//{'value': 'sw-KE', 'label': 'Swahili - Kenya'},
	{ value: "sv-FI", label: "Swedish - Finland" },
	{ value: "sv-SE", label: "Swedish - Sweden" },
	//{'value': 'syr-SY', 'label': 'Syriac - Syria'},
	//{'value': 'ta-IN', 'label': 'Tamil - India'},
	{ value: "tt-RU", label: "Tatar - Russia" },
	//{'value': 'te-IN', 'label': 'Telugu - India'},
	{ value: "th-TH", label: "Thai - Thailand" },
	{ value: "tr-TR", label: "Turkish - Turkey" },
	{ value: "uk-UA", label: "Ukrainian - Ukraine" },
	//{'value': 'ur-PK', 'label': 'Urdu - Pakistan'},
	//{'value': 'Cy-uz-UZ', 'label': 'Uzbek (Cyrillic) - Uzbekistan'},
	//{'value': 'Lt-uz-UZ', 'label': 'Uzbek (Latin) - Uzbekistan'},
	{ value: "vi-VN", label: "Vietnamese - Vietnam" }
];
