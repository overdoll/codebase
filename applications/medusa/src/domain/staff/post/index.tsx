import RootStaffPost from './RootStaffPost/RootStaffPost'
import StaffPostQuery from '@//:artifacts/StaffPostQuery.graphql'
import StaffLayout from '../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffPost.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

RootStaffPost.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffPostQuery: {
        params: StaffPostQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffPost.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffPost
