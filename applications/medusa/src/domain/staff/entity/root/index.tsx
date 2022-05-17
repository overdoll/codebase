import RootStaffEntity from './RootStaffEntity/RootStaffEntity'
import StaffLayout from '../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffEntity.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffEntity
