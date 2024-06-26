import RootNameClubSettings from './RootNameClubSettings/RootNameClubSettings'
import NameClubSettingsQuery from '@//:artifacts/NameClubSettingsQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

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

export default RootNameClubSettings
