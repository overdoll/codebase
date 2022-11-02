import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  UploadSearchSeriesCharactersMultiSelectorQuery
} from '@//:artifacts/UploadSearchSeriesCharactersMultiSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { CharacterTileOverlay, GridTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import { Stack } from '@chakra-ui/react'
import MediumGridWrap from '@//:modules/content/ContentSelection/MediumGridWrap/MediumGridWrap'
import UploadAddCharacterRequest from '../../UploadAddCharacterRequest/UploadAddCharacterRequest'

interface Props extends ComponentChoiceArguments<any>, ComponentSearchArguments<any> {
}

const Query = graphql`
  query UploadSearchSeriesCharactersMultiSelectorQuery($name: String, $clubCharacters: Boolean) {
    ...UploadSearchSeriesCharactersMultiSelectorFragment @arguments(name: $name, clubCharacters: $clubCharacters)
  }
`

const Fragment = graphql`
  fragment UploadSearchSeriesCharactersMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 14}
    after: {type: String},
    name: {type: String}
    clubCharacters: {type: Boolean, defaultValue: false}
  )
  @refetchable(queryName: "UploadSearchSeriesCharactersMultiSelectorPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $name,
      clubCharacters: $clubCharacters
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

export default function UploadSearchSeriesCharactersMultiSelector (props: Props): JSX.Element {
  const {
    searchArguments,
    register
  } = props

  const queryData = useLazyLoadQuery<UploadSearchSeriesCharactersMultiSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchSeriesCharactersMultiSelectorQuery, any>(
    Fragment,
    queryData
  )

  return (
    <EmptyBoundary
      fallback={(
        <Stack spacing={2}>
          <EmptyCharacters hint={searchArguments.variables.name} />
          <UploadAddCharacterRequest register={register} />
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
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </MediumGridWrap>
    </EmptyBoundary>
  )
}
