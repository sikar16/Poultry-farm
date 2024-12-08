import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import enTranslation from '../demo/en.json';
import amTranslation from '../demo/am.json';
import omTranslation from '../demo/om.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation,
            },
            am: {
                translation: amTranslation,
            },
            om: {
                translation: omTranslation,
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
