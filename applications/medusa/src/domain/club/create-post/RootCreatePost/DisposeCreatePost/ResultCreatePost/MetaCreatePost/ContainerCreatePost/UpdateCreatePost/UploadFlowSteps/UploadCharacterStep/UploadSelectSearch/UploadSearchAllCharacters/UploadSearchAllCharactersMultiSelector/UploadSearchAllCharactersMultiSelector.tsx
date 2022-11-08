import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  UploadSearchAllCharactersMultiSelectorQuery
} from '@//:artifacts/UploadSearchAllCharactersMultiSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { CharacterTileOverlay, GridTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import { Stack } from '@chakra-ui/react'
import MediumGridWrap from '@//:modules/content/ContentSelection/MediumGridWrap/MediumGridWrap'
import CharacterRequestTile from '../../../UploadAddCharacterRequest/CharacterRequestTile/CharacterRequestTile'
import CharacterRequestButton from '../../../UploadAddCharacterRequest/CharacterRequestButton/CharacterRequestButton'

interface Props extends ComponentChoiceArguments<any>, ComponentSearchArguments<any> {
  onOpen: () => void
}

const Query = graphql`
  query UploadSearchAllCharactersMultiSelectorQuery($name: String) {
    ...UploadSearchAllCharactersMultiSelectorFragment @arguments(name: $name)
  }
`

const Fragment = graphql`
  fragment UploadSearchAllCharactersMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 7}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "UploadSearchAllCharactersMultiSelectorPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "UploadSearchAllCharactersMultiSelector_characters")
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

export default function UploadSearchAllCharactersMultiSelector (props: Props): JSX.Element {
  const {
    searchArguments,
    register,
    onOpen
  } = props

  const queryData = useLazyLoadQuery<UploadSearchAllCharactersMultiSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchAllCharactersMultiSelectorQuery, any>(
    Fragment,
    queryData
  )

  if (searchArguments.variables.name == null || searchArguments.variables.name === '') {
    return <></>
  }

  return (
    <Stack spacing={2}>
      <EmptyBoundary
        fallback={(
          <Stack>
            <EmptyCharacters hint={searchArguments.variables.name} />
            <CharacterRequestButton onOpen={onOpen} />
          </Stack>
        )}
        condition={data.characters.edges.length < 1}
      >
        <MediumGridWrap>
          {data.characters.edges.map((item) => (
            <GridTile key={item.node.id}>
              <Choice {...register(item.node.id, {
                name: item.node.name,
                isRequest: false
              })}
              >
                <CharacterTileOverlay query={item.node} />
              </Choice>
            </GridTile>
          )
          )}
          <GridTile>
            <CharacterRequestTile onOpen={onOpen} />
          </GridTile>
          <LoadMoreGridTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(5)}
            isLoadingNext={isLoadingNext}
          />
        </MediumGridWrap>
      </EmptyBoundary>
    </Stack>
  )
}
