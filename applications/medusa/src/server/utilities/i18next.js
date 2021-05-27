import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
import { join } from 'path'
import { initReactI18next } from 'react-i18next'

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: false,
    fallbackLng: 'en',
    lng: 'en',
    load: 'languageOnly',
    ns: [],
    initImmediate: true,
    partialBundledLanguages: true,
    backend: {
      loadPath: join(__dirname, '../public/locales/{{lng}}/{{ns}}.json')
    }
  })

export default i18next
