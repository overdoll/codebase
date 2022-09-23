import RootRoulette from './RootRoulette/RootRoulette'
import ResultRouletteQuery from '@//:artifacts/ResultRouletteQuery.graphql'

RootRoulette.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootRoulette.getRelayPreloadProps = (ctx) => {
  const {
    query: {
      gameSessionId
    }
  } = ctx

  return ({
    queries: {
      rouletteQuery: {
        params: ResultRouletteQuery.params,
        variables: {
          reference: gameSessionId ?? ''
        }
      }
    }
  })
}

export default RootRoulette
