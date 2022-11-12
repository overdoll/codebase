import RootBlurbClubSettings from './RootBlurbClubSettings/RootBlurbClubSettings'
import BlurbClubSettingsQuery from '@//:artifacts/BlurbClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

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

RootBlurbClubSettings.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootBlurbClubSettings
