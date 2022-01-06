import { graphql, usePaginationFragment } from 'react-relay'
import { ClubListSelectorFragment$key } from '@//:artifacts/ClubListSelectorFragment.graphql'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Flex, Text } from '@chakra-ui/react'
import ClubPreview from '../../../../components/Posts/components/PostFlair/ClubPreview/ClubPreview'
import { RowItem, RowWrap, Selector, useSingleSelector } from '../../../../components/ContentSelection'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'

interface Props {
  query: ClubListSelectorFragment$key | null
  onChange: (id) => void
  initialSelection?: string | null
}

const Fragment = graphql`
  fragment ClubListSelectorFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "ClubListSelectorPaginationFragment" )
  {
    clubs (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "ClubListSelector_clubs")
    {
      edges {
        node {
          slug
          ...ClubPreviewFragment
        }
      }
    }
  }
`

export default function ClubListSelector ({
  query,
  onChange,
  initialSelection = null
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SelectClubsQuery, any>(
    Fragment,
    query
  )

  const [currentSelection, setCurrentSelection] = useSingleSelector({ initialSelection: initialSelection })

  const onSelect = (id): void => {
    onChange(id)
    if (currentSelection === id) return
    setCurrentSelection(id)
  }

  return (
    <RowWrap>
      {data.clubs.edges.map((item, index) => (
        <RowItem h='100%' key={index}>
          <Selector
            onSelect={onSelect}
            selected={(currentSelection != null) ? [currentSelection] : []}
            id={item.node.slug}
          >
            <Flex
              px={2}
              py={2}
            >
              <ClubPreview query={item.node} />
            </Flex>
          </Selector>
        </RowItem>
      )
      )}
      {hasNext &&
        <RowItem h='100%'>
          <ClickableBox
            onClick={() => loadNext(3)}
            isLoading={isLoadingNext}
          >
            <Flex justify='center'>
              <Text>
                <Trans>
                  Load more clubs
                </Trans>
              </Text>
            </Flex>
          </ClickableBox>
        </RowItem>}
    </RowWrap>
  )
}
