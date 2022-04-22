import RootStaffSearchCategories from './RootStaffSearchCategories/RootStaffSearchCategories'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffSearchCategories.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffSearchCategories
