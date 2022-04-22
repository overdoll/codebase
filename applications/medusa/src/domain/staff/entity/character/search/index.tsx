import RootStaffSearchCharacter from './RootStaffSearchCharacter/RootStaffSearchCharacter'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffSearchCharacter.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffSearchCharacter
