import RootStaffViewSeries from './RootStaffViewSeries/RootStaffViewSeries'
import StaffViewSeriesQuery from '@//:artifacts/StaffViewSeriesQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewSeries.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
