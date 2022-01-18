import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GridWrap, LargeGridItem } from '../../../components/ContentSelection'
import JoinClubButton from '../../ManageClub/components/JoinClubButton/JoinClubButton'
import { Heading, VStack } from '@chakra-ui/react'
import { ResourceIcon, SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: PreloadedQuery<MyClubsQuery>
}

const Query = graphql`
  query MyClubsQuery {
    ...MyClubsFragment
    viewer {
      ...JoinClubButtonViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment MyClubsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "MyClubsPaginationQuery" ) {
    clubs (first: $first, after: $after)
    @connection (key: "MyClubs_clubs") {
      edges {
        node {
          ...JoinClubButtonClubFragment
          thumbnail {
            ...ResourceIconFragment
          }
          id
          name
        }
      }
    }
  }
`

export default function MyClubs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<MyClubsQuery>(
    Query,
    props.query
  )
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<MyClubsQuery, any>(
    Fragment,
    queryData
  )

  return (
    <GridWrap>
      {data.clubs.edges.map((item, index) => <LargeGridItem key={index}>
        <SmallBackgroundBox w='100%' h='100%'>
          <VStack h='100%' align='center' justify='center'>
            <ResourceIcon query={item.node.thumbnail} />
            <Heading color='gray.00' fontSize='md'>
              {item.node.name}
            </Heading>
            <JoinClubButton clubQuery={item.node} viewerQuery={queryData.viewer} />
          </VStack>
        </SmallBackgroundBox>
      </LargeGridItem>)}
    </GridWrap>
  )
}
