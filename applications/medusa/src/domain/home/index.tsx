import Home from './RootHome/RootHome'
import ResultHomeQuery from '@//:artifacts/ResultHomeQuery.graphql'
import getPostSeed from '@//:modules/content/HookedComponents/Post/support/getPostSeed'

Home.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

Home.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      homeQuery: {
        params: ResultHomeQuery.params,
        variables: {
          ...getPostSeed(ctx)
        }
      }
    }
  })
}

export default Home
