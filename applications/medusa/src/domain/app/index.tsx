import Root from './Root/Root'
import RootQuery from '@//:artifacts/RootQuery.graphql'

const mapping = {
  en: 'en-US'
}

// dateFNS has weird mapping - so we check to make sure its proper here
function getDateFnsLocale (locale: string): string {
  if (mapping[locale] != null) {
    return mapping[locale]
  }

  return locale
}

Root.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  const dateFns = await import(
    /* webpackExclude: /_lib/ */`date-fns/locale/${getDateFnsLocale(ctx.locale as string)}/index.js`
  )

  return {
    ...translation.messages,
    dateFns
  }
}

Root.getRelayPreloadProps = () => ({
  queries: {
    rootQuery: {
      params: RootQuery.params,
      variables: {}
    }
  }
})

export default Root
