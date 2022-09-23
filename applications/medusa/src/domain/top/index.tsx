import RootTop from './RootTop/RootTop'
import ResultTopQuery from '@//:artifacts/ResultTopQuery.graphql'

RootTop.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootTop.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      randomQuery: {
        params: ResultTopQuery.params,
        variables: {}
      }
    }
  })
}

export default RootTop
