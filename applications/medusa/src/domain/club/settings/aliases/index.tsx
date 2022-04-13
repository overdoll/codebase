import RootAliasesClubSettings from './RootAliasesClubSettings/RootAliasesClubSettings'
import AliasesClubSettingsQuery from '@//:artifacts/AliasesClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

RootAliasesClubSettings.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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

export default RootAliasesClubSettings
