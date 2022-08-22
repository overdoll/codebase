import Home from './RootHome/RootHome'
import HomeQuery from '@//:artifacts/HomeQuery.graphql'
import getPostSeed from '@//:modules/content/Posts/support/getPostSeed'

Home.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

Home.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      homeQuery: {
        params: HomeQuery.params,
        variables: {
          ...getPostSeed(ctx)
        }
      }
    }
  })
}

export default Home
