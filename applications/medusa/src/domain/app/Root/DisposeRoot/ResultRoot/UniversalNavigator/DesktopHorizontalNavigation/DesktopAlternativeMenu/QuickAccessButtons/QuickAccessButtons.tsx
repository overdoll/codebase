import { graphql } from 'react-relay'
import { QuickAccessButtonsQuery } from '@//:artifacts/QuickAccessButtonsQuery.graphql'
import { Trans } from '@lingui/macro'
import { useLazyLoadQuery } from 'react-relay/hooks'
import React from 'react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

const Query = graphql`
  query QuickAccessButtonsQuery {
    viewer {
      clubsCount
      clubs(first: 1) @connection(key: "CreateClubListener_clubs") {
        edges {
          node {
            slug
          }
        }
      }
      hasClubSupporterSubscription
    }
  }
`

export default function QuickAccessButtons (): JSX.Element {
  const data = useLazyLoadQuery<QuickAccessButtonsQuery>(Query, {})

  if (data.viewer == null) return <></>

  if (data.viewer?.clubs?.edges != null) {
    if (data.viewer.clubsCount < 1 || data?.viewer?.clubs?.edges.length < 1 || data?.viewer?.clubs == null) {
      return (
        <LinkButton
          ml={1}
          borderRadius='lg'
          colorScheme='primary'
          href='/clubs/create-club'
        >
          <Trans>
            Create Club
          </Trans>
        </LinkButton>
      )
    }

    const selectedClub = data.viewer?.clubs.edges[0].node

    return (
      <LinkButton
        ml={1}
        borderRadius='lg'
        colorScheme='primary'
        href={{
          pathname: '/club/[slug]/create-post',
          query: { slug: selectedClub.slug }
        }}
      >
        <Trans>
          Create Post
        </Trans>
      </LinkButton>
    )
  }

  if (data.viewer.hasClubSupporterSubscription) {
    return (
      <LinkButton
        ml={1}
        borderRadius='lg'
        colorScheme='orange'
        href='/likes'
      >
        <Trans>
          My Likes
        </Trans>
      </LinkButton>
    )
  }

  return (
    <LinkButton
      ml={1}
      borderRadius='lg'
      colorScheme='orange'
      href='/supporter'
    >
      <Trans>
        Become Supporter
      </Trans>
    </LinkButton>
  )
}
