import RootPublicClubCharacter from './RootPublicClubCharacter/RootPublicClubCharacter'
import PublicClubCharacterQuery from '@//:artifacts/PublicClubCharacterQuery.graphql'
import decodeSearchArguments from '../../../common/components/PageHeader/SearchButton/support/decodeSearchArguments'

RootPublicClubCharacter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicClubCharacter.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  const {
    slug,
    characterSlug
  } = query

  return {
    queries: {
      publicClubCharacterQuery: {
        params: PublicClubCharacterQuery.params,
        variables: {
          slug,
          characterSlug,
          ...decodeSearchArguments(query)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}
export default RootPublicClubCharacter
