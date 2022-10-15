import RootClubSupporter from './RootClubSupporter/RootClubSupporter'
import ResultClubSupporterQuery from '@//:artifacts/ResultClubSupporterQuery.graphql'

RootClubSupporter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubSupporter.getRelayPreloadProps = () => {
  return ({
    queries: {
      clubSupporterQuery: {
        params: ResultClubSupporterQuery.params,
        variables: {}
      }
    }
  })
}

export default RootClubSupporter
