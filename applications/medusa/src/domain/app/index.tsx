import Root from './Root/Root'
import ResultRootQuery from '@//:artifacts/ResultRootQuery.graphql'

Root.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

Root.getRelayPreloadProps = () => {
  return {
    queries: {
      rootQuery: {
        params: ResultRootQuery.params,
        variables: {}
      }
    }
  }
}

export default Root
