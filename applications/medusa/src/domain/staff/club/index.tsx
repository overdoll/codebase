import RootStaffClub from './RootStaffClub/RootStaffClub'
import StaffClubQuery from '@//:artifacts/StaffClubQuery.graphql'
import StaffLayout from '../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffClub.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffClubQuery: {
        params: StaffClubQuery.params,
        variables: {
          slug: ctx.query.slug
        }
      }
    }
  }
}

RootStaffClub.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffClub
