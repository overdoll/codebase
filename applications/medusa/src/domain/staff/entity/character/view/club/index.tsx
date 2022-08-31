import RootStaffViewClubCharacter from './RootStaffViewClubCharacter/RootStaffViewClubCharacter'
import StaffViewClubCharacterQuery from '@//:artifacts/StaffViewClubCharacterQuery.graphql'
import StaffLayout from '@//:common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewClubCharacter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffViewClubCharacter.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffViewClubCharacterQuery: {
        params: StaffViewClubCharacterQuery.params,
        variables: {
          slug: ctx.query.slug,
          clubSlug: ctx.query.clubSlug
        }
      }
    }
  }
}

RootStaffViewClubCharacter.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffViewClubCharacter
