import RootBrowseCharacters from './RootBrowseCharacters/RootBrowseCharacters'
import ResultBrowseCharactersQuery from '@//:artifacts/ResultBrowseCharactersQuery.graphql'

RootBrowseCharacters.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootBrowseCharacters.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      browseCharactersQuery: {
        params: ResultBrowseCharactersQuery.params,
        variables: {}
      }
    }
  }
}

export default RootBrowseCharacters
