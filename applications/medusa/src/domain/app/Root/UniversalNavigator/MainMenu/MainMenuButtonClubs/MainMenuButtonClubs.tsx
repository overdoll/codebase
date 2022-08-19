import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { t } from '@lingui/macro'
import { BookmarkFull, DiscoverGlobe } from '@//:assets/icons'
import { MainMenuButtonClubsQuery } from '@//:artifacts/MainMenuButtonClubsQuery.graphql'
import HorizontalNavigation from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigation'
import { useLingui } from '@lingui/react'

const Query = graphql`
  query MainMenuButtonClubsQuery {
    viewer {
      likedPosts(first: 1) {
        edges {
          node {
            __typename
          }
        }
      }
    }
  }
`

export default function MainMenuButtonClubs (): JSX.Element {
  const data = useLazyLoadQuery<MainMenuButtonClubsQuery>(Query, {})

  const { i18n } = useLingui()

  if (data.viewer == null || data?.viewer.likedPosts?.edges.length < 1) {
    return (
      <HorizontalNavigation.Button
        exact
        colorScheme='primary'
        href='/clubs/discover'
        icon={DiscoverGlobe}
        label={i18n._(t`Discover Clubs`)}
      />
    )
  }

  return (
    <HorizontalNavigation.Button
      exact
      colorScheme='primary'
      href='/clubs/liked-posts'
      icon={BookmarkFull}
      label={i18n._(t`Your Saved Posts`)}
    />
  )
}
