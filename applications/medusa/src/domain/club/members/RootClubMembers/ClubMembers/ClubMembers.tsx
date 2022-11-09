import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubMembersQuery } from '@//:artifacts/ClubMembersQuery.graphql'
import { GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { Stack, Text } from '@chakra-ui/react'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import Head from 'next/head'
import ClubInformationBanner from '../../../../../common/components/ClubInformationBanner/ClubInformationBanner'
import ClubMemberTile from './ClubMemberTile/ClubMemberTile'

interface Props {
  query: PreloadedQuery<ClubMembersQuery>
}

const Query = graphql`
  query ClubMembersQuery($slug: String!) {
    club(slug: $slug) {
      name
      viewerIsOwner
      ...ClubInformationBannerFragment
      ...ClubMembersFragment
    }
    viewer {
      isStaff
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
          ...ClubMemberTileFragment
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

  if (queryData.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner && ((queryData.viewer?.isStaff) === false)) {
    return <NotFoundClub />
  }

  if (data.members.edges.length < 1) {
    return (
      <Text>
        <Trans>
          No members found
        </Trans>
      </Text>
    )
  }
  const title = `${queryData.club.name}'s Members - overdoll`

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <Stack>
        <ClubInformationBanner query={queryData.club} />
        <GridWrap>
          {data.members.edges.map((item) =>
            <ClubMemberTile key={item.node.id} query={item.node} />
          )}
          <LoadMoreGridTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(20)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </Stack>
    </>
  )
}
