import RootAliasesClubSettings from './RootAliasesClubSettings/RootAliasesClubSettings'
import AliasesClubSettingsQuery from '@//:artifacts/AliasesClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootAliasesClubSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootAliasesClubSettings.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      aliasesClubSettingsQuery: {
        params: AliasesClubSettingsQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootAliasesClubSettings.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootAliasesClubSettings.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootAliasesClubSettings
