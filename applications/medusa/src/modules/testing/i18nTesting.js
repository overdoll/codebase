/**
 * @flow
 */
import i18n from 'i18next'

// i18n specifically used for testing - no translations are provided here
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  debug: false,
  interpolation: {
    escapeValue: false
  },
  resources: { en: {} }
})

export default i18n
