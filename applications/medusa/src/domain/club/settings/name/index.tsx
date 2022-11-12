import RootNameClubSettings from './RootNameClubSettings/RootNameClubSettings'
import NameClubSettingsQuery from '@//:artifacts/NameClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootNameClubSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootNameClubSettings.getRelayPreloadProps = (ctx) => {
  const { query: { slug } } = ctx

  return {
    queries: {
      nameClubSettingsQuery: {
        params: NameClubSettingsQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootNameClubSettings.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootNameClubSettings.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootNameClubSettings
