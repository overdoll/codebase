import { i18n } from '@lingui/core'

const lang = document
  .querySelector('meta[name="browser-language"]')
  ?.getAttribute('content') as string

i18n._locale = lang
