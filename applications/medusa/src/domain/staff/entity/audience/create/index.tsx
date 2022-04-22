import RootStaffCreateAudience from './RootStaffCreateAudience/RootStaffCreateAudience'
import StaffCreateAudienceQuery from '@//:artifacts/StaffCreateAudienceQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateAudience.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffCreateAudienceQuery: {
        params: StaffCreateAudienceQuery.params,
        variables: {}
      }
    }
  }
}

RootStaffCreateAudience.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffCreateAudience
