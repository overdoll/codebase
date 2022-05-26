import RootStaffSearchSeries from './RootStaffSearchSeries/RootStaffSearchSeries'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffSearchSeries.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffSearchSeries.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffSearchSeries
