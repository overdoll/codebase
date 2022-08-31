import { HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import VerticalNavigation from '@//:modules/content/Navigation/VerticalNavigation/VerticalNavigation'
import { BookmarkFull, ClubPeopleGroup, DiscoverGlobe } from '@//:assets/icons'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { ClubsLayoutButtonsQuery } from '@//:artifacts/ClubsLayoutButtonsQuery.graphql'

const Query = graphql`
  query ClubsLayoutButtonsQuery {
    viewer {
      clubMembersPostsFeed(first: 1) {
        edges {
          node {
            __typename
          }
        }
      }
    }
  }
`

export default function ClubsLayoutButtons (): JSX.Element {
  const data = useLazyLoadQuery<ClubsLayoutButtonsQuery>(Query, {})

  return (
    <HStack justify='space-between' align='center' w='100%' spacing={2}>
      {(data.viewer != null && data.viewer.clubMembersPostsFeed.edges.length > 0)
        ? (
          <VerticalNavigation.Button
            href='/clubs/feed'
            colorScheme='primary'
            title={
              <Trans>
                My Feed
              </Trans>
            }
            icon={ClubPeopleGroup}
          />
          )
        : (
          <VerticalNavigation.Button
            href='/clubs/discover'
            colorScheme='primary'
            title={
              <Trans>
                Discover Clubs
              </Trans>
            }
            icon={DiscoverGlobe}
          />
          )}
      <VerticalNavigation.Button
        href='/clubs/liked-posts'
        colorScheme='primary'
        title={
          <Trans>
            Saved Posts
          </Trans>
        }
        icon={BookmarkFull}
      />
    </HStack>
  )
}
