import RootNew from './RootNew/RootNew'
import ResultNewQuery from '@//:artifacts/ResultNewQuery.graphql'

RootNew.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootNew.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      randomQuery: {
        params: ResultNewQuery.params,
        variables: {}
      }
    }
  })
}

export default RootNew
