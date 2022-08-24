import RootRoulette from './RootRoulette/RootRoulette'
import RouletteQuery from '@//:artifacts/RouletteQuery.graphql'

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
        params: RouletteQuery.params,
        variables: {
          reference: gameSessionId ?? ''
        }
      }
    }
  })
}

export default RootRoulette
