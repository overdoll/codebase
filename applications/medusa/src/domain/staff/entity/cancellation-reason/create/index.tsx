import RootStaffCreateCancellationReason from './RootStaffCreateCancellationReason/RootStaffCreateCancellationReason'
import StaffCreateCancellationReasonQuery from '@//:artifacts/StaffCreateCancellationReasonQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateCancellationReason.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffCreateCancellationReason.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      createCancellationReasonQuery: {
        params: StaffCreateCancellationReasonQuery.params,
        variables: {}
      }
    }
  }
}

RootStaffCreateCancellationReason.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffCreateCancellationReason
