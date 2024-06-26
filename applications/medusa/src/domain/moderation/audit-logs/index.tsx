import RootPostAuditLogs from './RootPostAuditLogs/RootPostAuditLogs'
import PostAuditLogsQuery from '@//:artifacts/PostAuditLogsQuery.graphql'
import ModerationLayout from '../../../common/components/Layouts/ModerationLayout/ModerationLayout'

RootPostAuditLogs.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPostAuditLogs.getRelayPreloadProps = () => ({
  queries: {
    postAuditLogsQuery: {
      params: PostAuditLogsQuery.params,
      variables: {
        from: new Date(new Date().setDate(new Date().getDate() - 7)),
        to: new Date()
      }
    }
  }
})

RootPostAuditLogs.getLayout = (page) => {
  return (
    <ModerationLayout>
      {page}
    </ModerationLayout>
  )
}

export default RootPostAuditLogs
