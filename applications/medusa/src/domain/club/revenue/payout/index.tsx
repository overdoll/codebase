import RootClubPayout from './RootClubPayout/RootClubPayout'
import ClubPayoutQuery from '@//:artifacts/ClubPayoutQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

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
