import RootClubSettings from './RootClubSettings/RootClubSettings'
import ClubSettingsQuery from '@//:artifacts/ClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootClubSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubSettings.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      clubSettingsQuery: {
        params: ClubSettingsQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootClubSettings.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootClubSettings.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootClubSettings
