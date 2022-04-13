import Home from './Home/RootHome'
import HomeQuery from '@//:artifacts/HomeQuery.graphql'

Home.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

Home.getRelayPreloadProps = () => ({
  queries: {
    homeQuery: {
      params: HomeQuery.params,
      variables: {}
    }
  }
})

export default Home
