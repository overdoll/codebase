import { graphql, useFragment } from 'react-relay/hooks'
import type { BannerCreatePostFragment$key } from '@//:artifacts/BannerCreatePostFragment.graphql'
import type { BannerCreatePostClubFragment$key } from '@//:artifacts/BannerCreatePostClubFragment.graphql'
import ClubInformationBanner from '@//:common/components/ClubInformationBanner/ClubInformationBanner'
import { Trans } from '@lingui/macro'
import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { ContentBookEdit } from '@//:assets/icons'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  postQuery: BannerCreatePostFragment$key | null
  clubQuery: BannerCreatePostClubFragment$key
}

const PostFragment = graphql`
  fragment BannerCreatePostFragment on Post {
    reference
    club {
      slug
    }
    state
  }
`

const ClubFragment = graphql`
  fragment BannerCreatePostClubFragment on Club {
    ...ClubInformationBannerFragment
  }
`

export default function BannerCreatePost ({
  postQuery,
  clubQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <>
      <ClubInformationBanner query={clubData} />
      {(postData?.state !== 'DRAFT' && postData != null) && (
        <Box mb={4} p={3} borderWidth={2} borderColor='teal.300' borderRadius='md'>
          <Stack spacing={1}>
            <Flex justify='space-between'>
              <HStack spacing={3}>
                <Icon icon={ContentBookEdit} w={5} h={5} fill='teal.300' />
                <Heading fontSize='xl' color='teal.300'>
                  <Trans>
                    Editing Post
                  </Trans>
                </Heading>
              </HStack>
              <LinkButton
                href={{
                  pathname: '/[slug]/post/[reference]',
                  query: {
                    slug: postData.club.slug,
                    reference: postData.reference
                  }
                }}
                size='sm'
                colorScheme='teal'
              >
                <Trans>
                  View Public Post
                </Trans>
              </LinkButton>
            </Flex>
            <Text fontSize='sm' color='gray.00'>
              <Trans>
                You are editing a post that was already published. Changes you make here will be visible on the post.
              </Trans>
            </Text>
          </Stack>
        </Box>
      )}
    </>
  )
}
