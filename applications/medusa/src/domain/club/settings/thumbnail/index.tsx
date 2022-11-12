import RootThumbnailClubSettings from './RootThumbnailClubSettings/RootThumbnailClubSettings'
import ThumbnailClubSettingsQuery from '@//:artifacts/ThumbnailClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootThumbnailClubSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootThumbnailClubSettings.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      thumbnailClubSettingsQuery: {
        params: ThumbnailClubSettingsQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootThumbnailClubSettings.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootThumbnailClubSettings.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootThumbnailClubSettings
