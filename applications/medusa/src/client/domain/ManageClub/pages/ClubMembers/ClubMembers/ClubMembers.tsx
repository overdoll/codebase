import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubMembersQuery } from '@//:artifacts/ClubMembersQuery.graphql'
import { GridWrap, RectangleGridItem } from '../../../../../components/ContentSelection'
import { ClickableBox, ResourceIcon } from '@//:modules/content/PageLayout'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from '@//:modules/routing'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<ClubMembersQuery>
}

const Query = graphql`
  query ClubMembersQuery($slug: String!) {
    club(slug: $slug) {
      ...ClubMembersFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubMembersFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 20}
    after: {type: String}
  )
  @refetchable(queryName: "ClubMembersPaginationQuery" ) {
    members (first: $first, after: $after)
    @connection (key: "ClubMembers_members") {
      edges {
        node {
          id
          account {
            username
            avatar {
              ...ResourceIconFragment
            }
          }
        }
      }
    }
  }
`

export default function ClubMembers ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubMembersQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ClubMembersQuery, any>(
    Fragment,
    queryData.club
  )

  if (queryData.club == null) return <></>

  if (data.members.edges.length < 1) {
    return (
      <Text>
        <Trans>
          No members found
        </Trans>
      </Text>
    )
  }

  return (
    <GridWrap justify='flex-start'>
      {data.members.edges.map((item, index) =>
        <RectangleGridItem key={index}>
          <Box w='100%' h='100%'>
            <Link to={`/u/${item.node.id}`}>
              <ClickableBox overflow='hidden' whiteSpace='normal' w='100%' h='100%'>
                <Flex direction='column' align='center' justify='center'>
                  <ResourceIcon mb={2} query={item.node.account.avatar} />
                  <Text fontSize='md' color='gray.00'>
                    {item.node.account.username}
                  </Text>
                </Flex>
              </ClickableBox>
            </Link>
          </Box>
        </RectangleGridItem>
      )}
      {hasNext &&
        <RectangleGridItem>
          <ClickableBox
            h='100%'
            w='100%'
            isLoading={isLoadingNext}
            onClick={() => loadNext(20)}
          >
            <Heading fontSize='lg' textAlign='center' color='gray.00'>
              <Trans>
                Load More
              </Trans>
            </Heading>
          </ClickableBox>
        </RectangleGridItem>}
    </GridWrap>
  )
}
