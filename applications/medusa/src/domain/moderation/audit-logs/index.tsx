import RootPostAuditLogs from './RootPostAuditLogs/RootPostAuditLogs'
import PostAuditLogsQuery from '@//:artifacts/PostAuditLogsQuery.graphql'

RootPostAuditLogs.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

RootPostAuditLogs.getRelayPreloadProps = () => ({
  queries: {
    postAuditLogsQuery: {
      params: PostAuditLogsQuery.params,
      variables: {}
    }
  }
})

export default RootPostAuditLogs
