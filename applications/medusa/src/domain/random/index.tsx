import RootRandom from './RootRandom/RootRandom'
import ResultRandomQuery from '@//:artifacts/ResultRandomQuery.graphql'

RootRandom.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootRandom.getRelayPreloadProps = (ctx) => {
  const seed = `${Date.now()}`

  return ({
    queries: {
      randomQuery: {
        params: ResultRandomQuery.params,
        variables: {
          seed: ctx.query.seed ?? seed
        }
      }
    }
  })
}

export default RootRandom
