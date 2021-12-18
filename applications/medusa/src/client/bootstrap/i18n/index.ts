import { i18n } from '@lingui/core'
import numbro from 'numbro'
import { disposeDependenciesAndReload } from '@//:modules/routing/router'
import routes from '../../routes'
import { History } from 'history'
import * as plurals from 'make-plural/plurals'

// promise because we need to do a bunch of stuff
async function disposeAndLoadClient (locale: string, history: History): Promise<any> {
  // set this before we call the dispose methods
  i18n._locale = locale

  // dispose of routes
  const dependencyPromises = disposeDependenciesAndReload(locale, routes, history)

  // reload our promises with the new locale, as well as the date library
  await Promise.all(dependencyPromises).then(
    () => {
      numbro.setLanguage(locale)

      // finally, activate (this will trigger a re-render)
      i18n._loadLocaleData(locale, { plurals: plurals[locale] })
      i18n.activate(locale)
    }
  )
}

function loadClientLocale (): void {
  const locale = document
    .querySelector('meta[name="browser-language"]')
    ?.getAttribute('content') as string

  numbro.setLanguage(locale)
  i18n._loadLocaleData(locale, { plurals: plurals[locale] })
  i18n._locale = locale
}

async function loadServerLocale (locale: string): Promise<void> {
  numbro.setLanguage(i18n.locale)
  i18n._loadLocaleData(locale, { plurals: plurals[locale] })
}

export { loadClientLocale, loadServerLocale, disposeAndLoadClient }
