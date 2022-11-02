import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  UploadSearchOtherCharactersMultiSelectorQuery
} from '@//:artifacts/UploadSearchOtherCharactersMultiSelectorQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { CharacterTileOverlay, GridTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptyCharacters } from '@//:modules/content/Placeholder'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import { Trans } from '@lingui/macro'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import MediumGridWrap from '@//:modules/content/ContentSelection/MediumGridWrap/MediumGridWrap'
import UploadAddCharacterRequest from '../../UploadAddCharacterRequest/UploadAddCharacterRequest'

interface Props extends ComponentChoiceArguments<any>, ComponentSearchArguments<any> {
}

const Query = graphql`
  query UploadSearchOtherCharactersMultiSelectorQuery($name: String) {
    ...UploadSearchOtherCharactersMultiSelectorFragment @arguments(name: $name)
  }
`

const Fragment = graphql`
  fragment UploadSearchOtherCharactersMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 14}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "UploadSearchOtherCharactersMultiSelectorPaginationFragment" )
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

export default function UploadSearchOtherCharactersMultiSelector (props: Props): JSX.Element {
  const {
    searchArguments,
    register
  } = props

  const queryData = useLazyLoadQuery<UploadSearchOtherCharactersMultiSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchOtherCharactersMultiSelectorQuery, any>(
    Fragment,
    queryData
  )

  if (searchArguments.variables.name == null || searchArguments.variables.name === '') {
    return (
      <HStack justify='center' p={6} bg='gray.800' borderRadius='md' spacing={2}>
        <Heading textAlign='center' color='gray.200' fontSize='lg'>
          <Trans>
            Type in the name of the character you're looking for
          </Trans>
        </Heading>
      </HStack>
    )
  }

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
