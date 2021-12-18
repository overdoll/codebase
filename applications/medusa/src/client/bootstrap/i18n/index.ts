import { i18n } from '@lingui/core'
import { setDefaultLocale } from '@//:modules/date'
import numbro from 'numbro'
import JSResource from '@//:modules/operations/JSResource'
import { disposeRouteLocalesAndLoad } from '@//:modules/routing/router'
import routes from '../../routes'
import { History } from 'history'

// date resource that will lazy-load locales so we don't include the whole thing in the bundle
const dateResource = JSResource('DateFns_Locale', async (locale) => (
  await import(
    /* webpackChunkName: "DateFns_Locale_[request]" */ `date-fns/locale/${getDateFnsLocale(locale)}`
  )
))

// promise because we need to do a bunch of stuff
async function disposeAndLoadClient (locale: string, history: History): Promise<any> {
  // dispose of dates
  dateResource.dispose()

  // dispose of routes
  const localePromises = disposeRouteLocalesAndLoad(locale, routes, history)
  const datePromises = dateResource.load(locale)

  // reload our promises with the new locale, as well as the date library
  return await Promise.all([...localePromises, datePromises]).then(
    () => {
      // set locale for dateFNS
      setDefaultLocale(dateResource.get().default)
      numbro.setLanguage(locale)

      // finally, activate (this will trigger a re-render)
      i18n.activate(locale)
    }
  )
}

function loadClientLocale (): void {
  const locale = document
    .querySelector('meta[name="browser-language"]')
    ?.getAttribute('content') as string

  i18n._locale = locale

  // load date resource
  void dateResource.load(locale).then(val => {
    setDefaultLocale(val.default)
  })
  numbro.setLanguage(i18n.locale)
}

async function loadServerLocale (locale: string): Promise<void> {
  const result = await dateResource.load(locale)
  setDefaultLocale(result.default)
  numbro.setLanguage(i18n.locale)
}

const mapping = {
  en: 'en-US'
}

function getDateFnsLocale (locale: string): string {
  if (mapping[locale] != null) {
    return mapping[locale]
  }

  return locale
}

export { loadClientLocale, loadServerLocale, disposeAndLoadClient }
