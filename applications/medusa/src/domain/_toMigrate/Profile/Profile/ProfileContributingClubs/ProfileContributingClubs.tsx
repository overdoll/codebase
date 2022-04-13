import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Stack } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ClubTileOverlay, LinkTile, StackTile } from '@//:modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import { ProfileContributingClubsFragment$key } from '@//:artifacts/ProfileContributingClubsFragment.graphql'

interface Props {
  query: ProfileContributingClubsFragment$key
}

const Fragment = graphql`
  fragment ProfileContributingClubsFragment on Account {
    contributingClubs: clubs {
      edges {
        node {
          slug
          ...ClubTileOverlayFragment
        }
      }
    }
  }
`

export default function ProfileContributingClubs ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <EmptyBoundary
      fallback={
        <SmallBackgroundBox>
          <Trans>Not contributing to any clubs</Trans>
        </SmallBackgroundBox>
      }
      condition={data.contributingClubs.edges.length < 1}
    >
      <Stack spacing={2}>
        {data.contributingClubs.edges.map((item, index) =>
          <StackTile key={index}>
            <LinkTile to={`/${item.node.slug}`}>
              <ClubTileOverlay query={item.node} />
            </LinkTile>
          </StackTile>)}
      </Stack>
    </EmptyBoundary>
  )
}
