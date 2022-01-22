import type { SuggestedClubsFragment, SuggestedClubsFragment$key } from '@//:artifacts/SuggestedClubsFragment.graphql'
import type { SuggestedClubsViewerFragment$key } from '@//:artifacts/SuggestedClubsViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { Heading, Stack } from '@chakra-ui/react'
import { ResourceIcon, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import JoinClubButton from '../../../ManageClub/components/JoinClubButton/JoinClubButton'
import { GridWrap, RectangleGridItem } from '../../../../components/ContentSelection'
import { useFragment } from 'react-relay/hooks'
import { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { Trans } from '@lingui/macro'

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
          ...JoinClubButtonClubFragment
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
      <SmallBackgroundBox w='100%' h='100%'>
        <Stack spacing={4} h='100%' align='center' justify='center'>
          <Stack align='center' justify='center' spacing={2}>
            <ResourceIcon h={12} w={12} query={node.thumbnail} />
            <Heading textAlign='center' color='gray.00' fontSize='md'>
              {node.name}
            </Heading>
          </Stack>
          <JoinClubButton w='100%' size='md' clubQuery={node} viewerQuery={viewerData} />
        </Stack>
      </SmallBackgroundBox>
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
    </GridWrap>
  )
}
