import RootBrowse from './RootBrowse/RootBrowse'
import ResultBrowseQuery from '@//:artifacts/ResultBrowseQuery.graphql'
import getPostSeed from '@//:modules/content/HookedComponents/Post/support/getPostSeed'

RootBrowse.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootBrowse.getCookieProps = () => {
  return {
    cookies: {
      postSeed: Date.now().toString()
    }
  }
}

RootBrowse.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      browseQuery: {
        params: ResultBrowseQuery.params,
        variables: {
          ...getPostSeed(ctx)
        }
      }
    }
  })
}

export default RootBrowse
