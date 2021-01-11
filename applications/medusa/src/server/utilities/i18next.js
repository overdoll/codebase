import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import path from 'path';
import { initReactI18next } from 'react-i18next';

console.log(path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'));

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    preload: ['en'],
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    lng: 'en',
    load: 'languageOnly',
    backend: {
      loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
    },
  });

export default i18next;
