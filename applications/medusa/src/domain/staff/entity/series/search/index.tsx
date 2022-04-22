import RootStaffSearchSeries from './RootStaffSearchSeries/RootStaffSearchSeries'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffSearchSeries.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffSearchSeries
