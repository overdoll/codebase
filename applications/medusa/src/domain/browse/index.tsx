import RootBrowse from './RootBrowse/RootBrowse'
import BrowseQuery from '@//:artifacts/BrowseQuery.graphql'
import getPostSeed from '@//:modules/content/Posts/support/getPostSeed'

RootBrowse.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootBrowse.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      browseQuery: {
        params: BrowseQuery.params,
        variables: {
          ...getPostSeed(ctx)
        }
      }
    }
  })
}

export default RootBrowse
