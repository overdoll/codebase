import RootStaffViewCategory from './RootStaffViewCategory/RootStaffViewCategory'
import StaffViewCategoryQuery from '@//:artifacts/StaffViewCategoryQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewCategory.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffViewCategory.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffViewCategoryQuery: {
        params: StaffViewCategoryQuery.params,
        variables: {
          slug: ctx.query.slug
        }
      }
    }
  }
}

RootStaffViewCategory.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffViewCategory
