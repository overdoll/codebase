import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import SafeJSONParse from '@//:modules/operations/SafeJSONParse'
import { initReactI18next } from 'react-i18next'

const options = {
  fallbackLng: 'en',
  load: 'languageOnly',
  saveMissing: true,
  debug: false,
  ns: [],
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  },
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  wait: process && !process.release,
  backend: {
    // for all available options read the backend's repository readme file
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  }
}

// In browser, get our translation data from the DOM
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (process && !process.release) {
  i18n.use(initReactI18next)
  i18n.use(Backend)
  // @ts-expect-error
  void i18n.init(options)

  // Get translations
  const translations = SafeJSONParse(
    document.getElementById('i18next-store')?.textContent ?? '{}',
    { en: {} }
  )

  // Get language
  const language = document
    .querySelector('meta[name="browser-language"]')
    ?.getAttribute('content')

  i18n.services.resourceStore.data = translations

  // add namespaces to the config - so a languageChange call loads all namespaces needed
  i18n.options.ns = Object.values(translations).reduce(
    (mem: string[], lngResources: {}) => {
      Object.keys(lngResources).forEach(ns => {
        if (!mem.includes(ns)) mem.push(ns)
      })
      return mem
    },
    i18n.options.ns
  )

  void i18n.changeLanguage(language as string)
}

export default i18n
