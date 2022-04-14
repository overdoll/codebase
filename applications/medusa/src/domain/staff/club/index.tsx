import RootStaffClub from './RootStaffClub/RootStaffClub'
import StaffClubQuery from '@//:artifacts/StaffClubQuery.graphql'
import StaffLayout from '../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffClub.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

RootStaffClub.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffClubQuery: {
        params: StaffClubQuery.params,
        variables: {
          slug: ctx.query.slug
        }
      }
    }
  }
}

RootStaffClub.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffClub
