import RootStaffSearchAudiences from './RootStaffSearchAudiences/RootStaffSearchAudiences'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffSearchAudiences.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffSearchAudiences
