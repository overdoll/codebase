import RootThumbnailClubSettings from './RootThumbnailClubSettings/RootThumbnailClubSettings'
import ThumbnailClubSettingsQuery from '@//:artifacts/ThumbnailClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

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

export default RootThumbnailClubSettings
