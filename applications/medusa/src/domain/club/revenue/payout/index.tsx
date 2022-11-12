import RootClubPayout from './RootClubPayout/RootClubPayout'
import ClubPayoutQuery from '@//:artifacts/ClubPayoutQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

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

RootClubPayout.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootClubPayout
