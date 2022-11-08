import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerPublicClubFragment$key } from '@//:artifacts/ContainerPublicClubFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollClubPosts from './ScrollClubPosts/ScrollClubPosts'
import { Trans } from '@lingui/macro'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import ClubBlurb from './ClubBlurb/ClubBlurb'
import ClubExternalLinks from './ClubExternalLinks/ClubExternalLinks'

interface Props {
  clubQuery: ContainerPublicClubFragment$key
}

const ClubFragment = graphql`
  fragment ContainerPublicClubFragment on Club {
    slug
    ...ClubExternalLinksFragment
    ...ClubBlurbFragment
    ...ScrollClubPostsFragment
  }
`

export default function ContainerPublicClub (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <ContentContainer>
      <Stack spacing={6}>
        <Stack spacing={2}>
          <ClubBlurb clubQuery={clubData} />
          <ClubExternalLinks clubQuery={clubData} />
        </Stack>
        <Stack spacing={2}>
          <HStack justify='space-between'>
            <Heading color='gray.00' fontSize='xl'>
              <Trans>
                New Posts
              </Trans>
            </Heading>
            <LinkButton
              fontWeight='semibold'
              linkProps={{
                scroll: false
              }}
              size='sm'
              colorScheme='gray'
              variant='link'
              href={{
                pathname: '/[slug]/posts',
                query: {
                  slug: clubData.slug
                }
              }}
            >
              <Trans>
                See all
              </Trans>
            </LinkButton>
          </HStack>
          <ScrollClubPosts clubQuery={clubData} />
        </Stack>
      </Stack>
    </ContentContainer>
  )
}
