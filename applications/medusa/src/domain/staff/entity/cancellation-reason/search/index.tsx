import RootStaffSearchCancellationReasons from './RootStaffSearchCancellationReasons/RootStaffSearchCancellationReasons'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffSearchCancellationReasons.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffSearchCancellationReasons.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffSearchCancellationReasons
