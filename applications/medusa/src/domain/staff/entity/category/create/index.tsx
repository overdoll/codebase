import RootStaffCreateCategory from './RootStaffCreateCategory/RootStaffCreateCategory'
import StaffCreateCategoryQuery from '@//:artifacts/StaffCreateCategoryQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateCategory.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffCreateCategoryQuery: {
        params: StaffCreateCategoryQuery.params,
        variables: {}
      }
    }
  }
}

RootStaffCreateCategory.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffCreateCategory
