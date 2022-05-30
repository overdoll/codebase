import RootStaffViewAudience from './RootStaffViewAudience/RootStaffViewAudience'
import StaffViewAudienceQuery from '@//:artifacts/StaffViewAudienceQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewAudience.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffViewAudience.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffViewAudienceQuery: {
        params: StaffViewAudienceQuery.params,
        variables: {
          slug: ctx.query.slug
        }
      }
    }
  }
}

RootStaffViewAudience.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffViewAudience
