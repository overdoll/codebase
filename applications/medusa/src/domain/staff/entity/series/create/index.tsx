import RootStaffCreateSeries from './RootStaffCreateSeries/RootStaffCreateSeries'
import StaffCreateSeriesQuery from '@//:artifacts/StaffCreateSeriesQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateSeries.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffCreateSeriesQuery: {
        params: StaffCreateSeriesQuery.params,
        variables: {}
      }
    }
  }
}

RootStaffCreateSeries.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffCreateSeries
