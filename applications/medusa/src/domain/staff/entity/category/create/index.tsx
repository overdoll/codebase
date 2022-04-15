import RootStaffCreateCategory from './RootStaffCreateCategory/RootStaffCreateCategory'
import StaffCreateCategoryQuery from '@//:artifacts/StaffCreateCategoryQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateCategory.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
