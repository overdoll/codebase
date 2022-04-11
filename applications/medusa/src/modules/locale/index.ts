import { i18n } from '@lingui/core'
import * as plurals from 'make-plural'

export function dateFnsLocaleFromI18n (i18nv: typeof i18n): Locale {
  return i18nv._messages[i18nv._locale].dateFns as Locale
}

export function initializeLocaleData (lang: string, i18nv: typeof i18n): void {
  i18nv.loadLocaleData(lang, { plurals: plurals[lang] })
}
