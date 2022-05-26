import Home from './RootHome/RootHome'
import HomeQuery from '@//:artifacts/HomeQuery.graphql'

Home.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

Home.getRelayPreloadProps = () => ({
  queries: {
    homeQuery: {
      params: HomeQuery.params,
      variables: {}
    }
  }
})

export default Home
