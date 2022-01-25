import type { SuggestedClubsFragment, SuggestedClubsFragment$key } from '@//:artifacts/SuggestedClubsFragment.graphql'
import type { SuggestedClubsViewerFragment$key } from '@//:artifacts/SuggestedClubsViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { Heading, Stack } from '@chakra-ui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import JoinClubButton from '../../../ManageClub/components/JoinClubButton/JoinClubButton'
import { GridWrap, RectangleGridItem } from '../../../../components/ContentSelection'
import { useFragment } from 'react-relay/hooks'
import { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { Trans } from '@lingui/macro'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import ItemOverlay from '../../../../components/ContentSelection/components/ItemOverlay/ItemOverlay'
import { Link } from '@//:modules/routing'
import LoadMoreRectangle from '../../../../components/ContentSelection/components/LoadMoreRectangle/LoadMoreRectangle'

interface Props {
  query: SuggestedClubsFragment$key | null
  viewerQuery: SuggestedClubsViewerFragment$key | null
}

interface ClubProps {
  node: SuggestedClubsFragment['clubs']['edges'][0]['node']
}

const Fragment = graphql`
  fragment SuggestedClubsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 7}
    after: {type: String}
  )
  @refetchable(queryName: "SuggestedClubsPaginationQuery" ) {
    clubs (first: $first, after: $after)
    @connection (key: "SuggestedClubs_clubs") {
      edges {
        node {
          slug
          ...JoinClubButtonClubFragment
          posts(first: 1) {
            edges {
              node {
                content {
                  ...ResourceItemFragment
                }
              }
            }
          }
          thumbnail {
            ...ResourceIconFragment
          }
          name
        }
      }
    }
  }
`

const ViewerFragment = graphql`
  fragment SuggestedClubsViewerFragment on Account {
    ...JoinClubButtonViewerFragment
    clubMembershipsCount
  }
`

export default function SuggestedClubs ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<MyClubsQuery, any>(
    Fragment,
    query
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const ClubItem = ({ node }: ClubProps): JSX.Element => {
    return (
      <ItemOverlay background={
        <ResourceItem h='100%' query={node.posts?.edges[0]?.node?.content[0]} />
      }
      >
        <Stack w='100%' spacing={4} h='100%' align='center' justify='center'>
          <Link to={`/${node.slug}`}>
            <Stack w='100%' align='center' justify='center' spacing={2}>
              <ResourceIcon h={12} w={12} query={node.thumbnail} />
              <Heading textAlign='center' color='gray.00' fontSize='md'>
                {node.name}
              </Heading>
            </Stack>
          </Link>
          <JoinClubButton w='100%' size='md' clubQuery={node} viewerQuery={viewerData} />
        </Stack>
      </ItemOverlay>
    )
  }

  if (data.clubs.edges.length < 1) {
    return <Trans>No clubs found</Trans>
  }

  return (
    <GridWrap>
      {data.clubs.edges.map((item, index) =>
        <RectangleGridItem key={index}>
          <ClubItem node={item.node} />
        </RectangleGridItem>)}
      <LoadMoreRectangle
        hasNext={hasNext}
        onLoadNext={() => loadNext(10)}
        isLoadingNext={isLoadingNext}
      />
    </GridWrap>
  )
}
