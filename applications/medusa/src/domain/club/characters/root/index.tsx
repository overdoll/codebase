import RootClubCharacters from './RootClubCharacters/RootClubCharacters'
import ClubCharactersQuery from '@//:artifacts/ClubCharactersQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootClubCharacters.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubCharacters.getRelayPreloadProps = (ctx) => {
  const {
    query: {
      slug
    }
  } = ctx

  return {
    queries: {
      clubCharactersQuery: {
        params: ClubCharactersQuery.params,
        variables: {
          slug: slug
        }
      }
    }
  }
}

RootClubCharacters.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootClubCharacters.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootClubCharacters
