import Home from './RootHome/RootHome'
import ResultHomeQuery from '@//:artifacts/ResultHomeQuery.graphql'
import Root from '../app'

Home.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

Root.getCookieProps = () => {
  return {
    cookies: {
      postSeed: Date.now().toString()
    }
  }
}

Home.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      homeQuery: {
        params: ResultHomeQuery.params,
        variables: {}
      }
    }
  })
}

export default Home
