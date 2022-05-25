import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { t } from '@lingui/macro'
import { ClubPeopleGroup } from '@//:assets/icons/navigation'
import { MainMenuButtonClubsQuery } from '@//:artifacts/MainMenuButtonClubsQuery.graphql'
import HorizontalNavigation from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigation'
import { useLingui } from '@lingui/react'

const Query = graphql`
  query MainMenuButtonClubsQuery {
    viewer {
      clubMembershipsCount
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

export default function MainMenuButtonClubs (): JSX.Element {
  const data = useLazyLoadQuery<MainMenuButtonClubsQuery>(Query, {})

  const { i18n } = useLingui()

  if (data.viewer == null || data.viewer.clubMembershipsCount < 1 || data?.viewer.clubMembersPostsFeed?.edges.length < 1) {
    return (
      <HorizontalNavigation.Button
        exact
        colorScheme='primary'
        href='/clubs/discover'
        icon={ClubPeopleGroup}
        label={i18n._(t`Discover Clubs`)}
      />
    )
  }

  return (
    <HorizontalNavigation.Button
      exact
      colorScheme='primary'
      href='/clubs/feed'
      icon={ClubPeopleGroup}
      label={i18n._(t`Your Clubs Feed`)}
    />
  )
}
