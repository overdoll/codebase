import Root from './Root/Root'
import RootQuery from '@//:artifacts/RootQuery.graphql'

Root.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

Root.getRelayPreloadProps = () => {
  return {
    queries: {
      rootQuery: {
        params: RootQuery.params,
        variables: {}
      }
    }
  }
}

export default Root
