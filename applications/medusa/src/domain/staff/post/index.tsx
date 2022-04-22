import RootStaffPost from './RootStaffPost/RootStaffPost'
import StaffPostQuery from '@//:artifacts/StaffPostQuery.graphql'
import StaffLayout from '../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffPost.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffPostQuery: {
        params: StaffPostQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffPost.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffPost
