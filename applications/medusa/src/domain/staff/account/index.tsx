import RootStaffAccount from './RootStaffAccount/RootStaffAccount'
import StaffAccountQuery from '@//:artifacts/StaffAccountQuery.graphql'
import StaffLayout from '../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffAccount.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffAccount.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffAccountQuery: {
        params: StaffAccountQuery.params,
        variables: {
          username: ctx.query.username
        }
      }
    }
  }
}

RootStaffAccount.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffAccount
