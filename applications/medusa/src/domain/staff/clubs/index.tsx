import RootStaffClubs from './RootStaffClubs/RootStaffClubs'
import StaffLayout from '@//:common/components/Layouts/StaffLayout/StaffLayout'

RootStaffClubs.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffClubs.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffClubs
