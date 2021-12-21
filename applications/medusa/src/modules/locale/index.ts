import { i18n } from '@lingui/core'

export function dateFnsLocaleFromI18n (i18nv: typeof i18n): Locale {
  return i18nv._messages[i18nv._locale].dateFns as Locale
}
