import RootBlurbClubSettings from './RootBlurbClubSettings/RootBlurbClubSettings'
import BlurbClubSettingsQuery from '@//:artifacts/BlurbClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

RootBlurbClubSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootBlurbClubSettings.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      blurbClubSettingsQuery: {
        params: BlurbClubSettingsQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootBlurbClubSettings.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

export default RootBlurbClubSettings
