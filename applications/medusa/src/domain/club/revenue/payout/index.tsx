import RootClubPayout from './RootClubPayout/RootClubPayout'
import ClubPayoutQuery from '@//:artifacts/ClubPayoutQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

RootClubPayout.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubPayout.getRelayPreloadProps = (ctx) => {
  const { query: { reference } } = ctx

  return {
    queries: {
      clubPayoutQuery: {
        params: ClubPayoutQuery.params,
        variables: {
          reference: reference
        }
      }
    }
  }
}

RootClubPayout.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

export default RootClubPayout
