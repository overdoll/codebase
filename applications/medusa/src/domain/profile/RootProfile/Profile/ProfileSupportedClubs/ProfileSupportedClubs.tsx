import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Stack } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ClubTileOverlay, LinkTile, StackTile } from '@//:modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import { ProfileSupportedClubsFragment$key } from '@//:artifacts/ProfileSupportedClubsFragment.graphql'

interface Props {
  query: ProfileSupportedClubsFragment$key
}

const Fragment = graphql`
  fragment ProfileSupportedClubsFragment on Account {
    supportedClubs: clubs {
      edges {
        node {
          id
          slug
          ...ClubTileOverlayFragment
        }
      }
    }
  }
`

export default function ProfileSupportedClubs ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <EmptyBoundary
      fallback={
        <SmallBackgroundBox>
          <Trans>Not supporting any clubs</Trans>
        </SmallBackgroundBox>
      }
      condition={data.supportedClubs.edges.length < 1}
    >
      <Stack spacing={2}>
        {data.supportedClubs.edges.map((item, index) =>
          <StackTile key={item.node.id}>
            <LinkTile href={`/${item.node.slug}`}>
              <ClubTileOverlay query={item.node} />
            </LinkTile>
          </StackTile>)}
      </Stack>
    </EmptyBoundary>
  )
}
