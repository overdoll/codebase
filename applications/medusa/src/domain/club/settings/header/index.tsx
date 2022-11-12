import RootHeaderClubSettings from './RootHeaderClubSettings/RootHeaderClubSettings'
import HeaderClubSettingsQuery from '@//:artifacts/HeaderClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

RootHeaderClubSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootHeaderClubSettings.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      headerClubSettingsQuery: {
        params: HeaderClubSettingsQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootHeaderClubSettings.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

export default RootHeaderClubSettings
