import RootBrowse from './RootBrowse/RootBrowse'
import BrowseQuery from '@//:artifacts/BrowseQuery.graphql'

RootBrowse.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootBrowse.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      browseQuery: {
        params: BrowseQuery.params,
        variables: {}
      }
    }
  })
}

export default RootBrowse
