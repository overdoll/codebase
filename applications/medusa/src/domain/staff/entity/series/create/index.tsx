import RootStaffCreateSeries from './RootStaffCreateSeries/RootStaffCreateSeries'
import StaffCreateSeriesQuery from '@//:artifacts/StaffCreateSeriesQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateSeries.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
