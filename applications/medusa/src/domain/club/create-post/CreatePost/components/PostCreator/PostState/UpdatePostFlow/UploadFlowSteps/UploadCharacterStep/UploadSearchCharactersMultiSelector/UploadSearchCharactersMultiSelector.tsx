import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  UploadSearchCharactersMultiSelectorQuery
} from '@//:artifacts/UploadSearchCharactersMultiSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { CharacterTileOverlay, GridTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import SuggestPrompt from '../../../../../../SuggestPrompt/SuggestPrompt'
import { Trans } from '@lingui/macro'
import { Stack } from '@chakra-ui/react'
import ShortGridWrap from '@//:modules/content/ContentSelection/ShortGridWrap/ShortGridWrap'

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
    first: {type: Int, defaultValue: 14}
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
      condition={data.characters.edges.length < 1}
    >
      <ShortGridWrap>
        {data.characters.edges.map((item, index) => (
          <GridTile key={index}>
            <Choice {...register(item.node.id, { name: item.node.name })}>
              <CharacterTileOverlay query={item.node} />
            </Choice>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </ShortGridWrap>
    </EmptyBoundary>
  )
}
