import RootClubSettings from './RootClubSettings/RootClubSettings'
import ClubSettingsQuery from '@//:artifacts/ClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

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

export default RootClubSettings
