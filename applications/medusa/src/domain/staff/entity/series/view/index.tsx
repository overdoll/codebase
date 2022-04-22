import RootStaffViewSeries from './RootStaffViewSeries/RootStaffViewSeries'
import StaffViewSeriesQuery from '@//:artifacts/StaffViewSeriesQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewSeries.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffViewSeriesQuery: {
        params: StaffViewSeriesQuery.params,
        variables: {
          slug: ctx.query.slug
        }
      }
    }
  }
}

RootStaffViewSeries.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffViewSeries
