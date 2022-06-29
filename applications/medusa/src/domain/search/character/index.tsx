import RootSearchCharacter from './RootSearchCharacter/RootSearchCharacter'
import SearchCharacterQuery from '@//:artifacts/SearchCharacterQuery.graphql'
import decodeSearchArguments from '../../../common/components/PageHeader/SearchButton/support/decodeSearchArguments'

RootSearchCharacter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootSearchCharacter.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  const {
    seriesSlug,
    characterSlug
  } = query

  return {
    queries: {
      searchCharacterQuery: {
        params: SearchCharacterQuery.params,
        variables: {
          seriesSlug,
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
export default RootSearchCharacter
