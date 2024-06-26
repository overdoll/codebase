import RootStaffViewCancellationReason from './RootStaffViewCancellationReason/RootStaffViewCancellationReason'
import StaffViewCancellationReasonQuery from '@//:artifacts/StaffViewCancellationReasonQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewCancellationReason.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffViewCancellationReason.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffViewCancellationReasonQuery: {
        params: StaffViewCancellationReasonQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffViewCancellationReason.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffViewCancellationReason
