import RootRandom from './RootRandom/RootRandom'
import RandomQuery from '@//:artifacts/RandomQuery.graphql'

RootRandom.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootRandom.getRelayPreloadProps = (ctx) => {
  const time = `${Date.now()}`

  return ({
    queries: {
      randomQuery: {
        params: RandomQuery.params,
        variables: {
          seed: time
        }
      }
    }
  })
}

export default RootRandom
