import i18n from 'i18next';
import Fetch from 'i18next-fetch-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
	.use(Fetch)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		detection: {
			order: ['queryString', 'cookie'],
			cache: ['c'],
		},
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
