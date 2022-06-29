import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  UploadSearchCharactersMultiSelectorQuery
} from '@//:artifacts/UploadSearchCharactersMultiSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import removeNode from '@//:modules/support/removeNode'
import { CharacterTileOverlay, GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import SuggestPrompt from '../../../../../../SuggestPrompt/SuggestPrompt'
import { Trans } from '@lingui/macro'
import { Stack } from '@chakra-ui/react'

interface Props extends ComponentChoiceArguments<any>, ComponentSearchArguments<any> {
}

const Query = graphql`
  query UploadSearchCharactersMultiSelectorQuery($name: String) {
    ...UploadSearchCharactersMultiSelectorFragment @arguments(name: $name)
  }
`

const Fragment = graphql`
  fragment UploadSearchCharactersMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "UploadSearchCharactersMultiSelectorPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "UploadSearchCharactersMultiSelector_characters")
    {
      edges {
        node {
          id
          name
          ...CharacterTileOverlayFragment
        }
      }
    }
  }
`

export default function UploadSearchCharactersMultiSelector ({
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<UploadSearchCharactersMultiSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchCharactersMultiSelectorQuery, any>(
    Fragment,
    queryData
  )

  const characters = removeNode(data.characters.edges)

  return (
    <EmptyBoundary
      fallback={(
        <Stack spacing={2}>
          <EmptyCharacters hint={searchArguments.variables.name} />
          <SuggestPrompt>
            <Trans>
              Have a character suggestion or want your character listed? Send us an email at hello@overdoll.com!
            </Trans>
          </SuggestPrompt>
        </Stack>)}
      condition={characters.length < 1}
    >
      <GridWrap>
        {characters.map((item, index) => (
          <GridTile key={index}>
            <Choice {...register(item.id, { name: item.name })}>
              <CharacterTileOverlay query={item} />
            </Choice>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
