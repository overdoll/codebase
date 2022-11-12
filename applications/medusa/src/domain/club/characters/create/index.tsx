import RootCreateClubCharacter from './RootCreateClubCharacter/RootCreateClubCharacter'
import CreateClubCharacterQuery from '@//:artifacts/CreateClubCharacterQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

RootCreateClubCharacter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootCreateClubCharacter.getRelayPreloadProps = (ctx) => {
  const {
    query: {
      slug
    }
  } = ctx

  return {
    queries: {
      createClubCharacterQuery: {
        params: CreateClubCharacterQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootCreateClubCharacter.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

export default RootCreateClubCharacter
