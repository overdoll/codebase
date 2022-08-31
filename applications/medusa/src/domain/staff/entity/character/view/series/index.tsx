import RootStaffViewCharacter from './RootStaffViewCharacter/RootStaffViewCharacter'
import StaffViewCharacterQuery from '@//:artifacts/StaffViewCharacterQuery.graphql'
import StaffLayout from '@//:common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewCharacter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootStaffViewCharacter.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffViewCharacterQuery: {
        params: StaffViewCharacterQuery.params,
        variables: {
          slug: ctx.query.slug,
          seriesSlug: ctx.query.seriesSlug
        }
      }
    }
  }
}

RootStaffViewCharacter.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffViewCharacter
