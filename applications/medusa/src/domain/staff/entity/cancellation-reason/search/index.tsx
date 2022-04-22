import RootStaffSearchCancellationReasons from './RootStaffSearchCancellationReasons/RootStaffSearchCancellationReasons'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffSearchCancellationReasons.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffSearchCancellationReasons
