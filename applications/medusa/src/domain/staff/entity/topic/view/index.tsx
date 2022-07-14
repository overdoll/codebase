import RootStaffViewTopic from './RootStaffViewTopic/RootStaffViewTopic'
import StaffViewTopicQuery from '@//:artifacts/StaffViewTopicQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewTopic.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffViewTopic.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffViewTopicQuery: {
        params: StaffViewTopicQuery.params,
        variables: {
          slug: ctx.query.slug
        }
      }
    }
  }
}

RootStaffViewTopic.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffViewTopic
