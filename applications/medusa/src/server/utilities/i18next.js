import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
import { join } from 'path'
import { initReactI18next } from 'react-i18next'
import { lstatSync, readdirSync } from 'fs'

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: false,
    fallbackLng: 'en',
    ns: ['auth', 'token', 'empty'],
    defaultNS: 'auth',
    lng: 'en',
    load: 'languageOnly',
    initImmediate: false,
    preload: readdirSync(join(__dirname, '../public/locales')).filter(
      fileName => {
        const joinedPath = join(join(__dirname, '../public/locales'), fileName)
        return lstatSync(joinedPath).isDirectory()
      }
    ),
    backend: {
      loadPath: join(__dirname, '../public/locales/{{lng}}/{{ns}}.json')
    }
  })

export default i18next
