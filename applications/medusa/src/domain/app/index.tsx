import Root from './Root/Root'
import RootQuery from '@//:artifacts/RootQuery.graphql'

Root.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

Root.getRelayPreloadProps = () => ({
  queries: {
    rootQuery: {
      params: RootQuery.params,
      variables: {}
    }
  }
})

export default Root
