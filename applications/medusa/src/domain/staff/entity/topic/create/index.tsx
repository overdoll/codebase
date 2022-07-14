import RootStaffCreateTopic from './RootStaffCreateTopic/RootStaffCreateTopic'
import StaffCreateTopicQuery from '@//:artifacts/StaffCreateTopicQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateTopic.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffCreateTopic.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffCreateTopicQuery: {
        params: StaffCreateTopicQuery.params,
        variables: {}
      }
    }
  }
}

RootStaffCreateTopic.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffCreateTopic
