import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { initReactI18next } from 'react-i18next';
import path from 'path';

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['auth', 'token', 'empty'],
    lng: 'en',
    load: 'languageOnly',
    backend: {
      loadPath: path.join(__dirname, '../public/locales/{{lng}}/{{ns}}.json'),
    },
  });

export default i18next;
