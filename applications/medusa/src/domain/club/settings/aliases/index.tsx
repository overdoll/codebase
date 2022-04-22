import RootAliasesClubSettings from './RootAliasesClubSettings/RootAliasesClubSettings'
import AliasesClubSettingsQuery from '@//:artifacts/AliasesClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

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
