import { graphql } from 'react-relay'
import { Box, Flex } from '@chakra-ui/react'
import HorizontalNavigationButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationButton/HorizontalNavigationButton'
import { QuickAccessButtonsQuery } from '@//:artifacts/QuickAccessButtonsQuery.graphql'
import { Trans } from '@lingui/macro'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { FeedMenu } from '@//:assets/icons'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import React from 'react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

const Query = graphql`
  query QuickAccessButtonsQuery {
    viewer {
      username
      ...AccountIconFragment
      clubs(first: 1) @connection(key: "CreateClubListener_clubs") {
        edges {
          node {
            name
            slug
            ...ClubIconFragment
          }
        }
      }
    }
  }
`

export default function QuickAccessButtons (): JSX.Element {
  const data = useLazyLoadQuery<QuickAccessButtonsQuery>(Query, {})

  if (data.viewer == null) return <></>

  if (data.viewer?.clubs?.edges != null && data?.viewer?.clubs?.edges.length > 0) {
    const selectedClub = data.viewer?.clubs.edges[0].node

    return (
      <Box p={2}>
        <HorizontalNavigationButton
          icon={FeedMenu}
          href={{
            pathname: '/club/[slug]/home',
            query: { slug: selectedClub.slug }
          }}
          label={selectedClub.name}
        >
          <Flex
            h='100%'
            align='center'
            justify='center'
          >
            <ClubIcon size='md' clubQuery={selectedClub} />
          </Flex>
        </HorizontalNavigationButton>
      </Box>
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
