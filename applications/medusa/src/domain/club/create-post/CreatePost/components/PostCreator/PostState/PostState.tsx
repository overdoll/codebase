import { graphql, useFragment } from 'react-relay/hooks'
import { Box, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import UpdatePostFlow from './UpdatePostFlow/UpdatePostFlow'
import Button from '@//:modules/form/Button/Button'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import CreatePostFlow from './CreatePostFlow/CreatePostFlow'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { CheckCircle, DeleteCircle, PauseCircle } from '@//:assets/icons/interface'
import type { PostStateFragment$key } from '@//:artifacts/PostStateFragment.graphql'
import type { PostStateClubFragment$key } from '@//:artifacts/PostStateClubFragment.graphql'
import { Trans } from '@lingui/macro'
import PostSubmitted from './PostSubmitted/PostSubmitted'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { CLUB_GUIDELINES } from '@//:modules/constants/links'
import { useRouter } from 'next/router'
import ClubInformationBanner from '../../../../../../../common/components/ClubInformationBanner/ClubInformationBanner'

interface Props {
  postQuery: PostStateFragment$key | null
  clubQuery: PostStateClubFragment$key | null
}

const PostFragment = graphql`
  fragment PostStateFragment on Post {
    __typename
    state
    ...UpdatePostFlowFragment
  }
`

const ClubFragment = graphql`
  fragment PostStateClubFragment on Club {
    __typename
    id
    ...ClubInformationBannerFragment
  }
`

export default function PostState ({
  postQuery,
  clubQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const clubData = useFragment(ClubFragment, clubQuery)

  const { state } = useSequenceContext()

  const router = useRouter()

  if (clubData == null) {
    return <NotFoundClub />
  }

  if (state.isSubmitted === true) {
    return <PostSubmitted />
  }

  // If there is no post found from the URL parameter, show create post initiator
  if (postData == null) {
    return (
      <>
        <ClubInformationBanner query={clubData} />
        <Stack spacing={4}>
          <CreatePostFlow clubId={clubData.id} />
          <Stack spacing={2}>
            <Heading color='gray.00' fontSize='2xl'>
              <Trans>
                As a reminder of the guidelines
              </Trans>
            </Heading>
            <Stack spacing={2}>
              <HStack align='center' spacing={3}>
                <Icon flexShrink={0} icon={CheckCircle} fill='gray.100' w={3} h={3} />
                <Heading fontSize='md' color='gray.100'>
                  <Trans>
                    All characters must be depicted as 18 or older
                  </Trans>
                </Heading>
              </HStack>
              <HStack align='center' spacing={3}>
                <Icon flexShrink={0} icon={DeleteCircle} fill='gray.100' w={3} h={3} />
                <Heading fontSize='md' color='gray.100'>
                  <Trans>
                    Cannot contain themes of incest, non-consensual sexual behaviour, non-consensual mutilation,
                    or bestiality
                  </Trans>
                </Heading>
              </HStack>
              <HStack align='center' spacing={3}>
                <Icon flexShrink={0} icon={DeleteCircle} fill='gray.100' w={3} h={3} />
                <Heading fontSize='md' color='gray.100'>
                  <Trans>
                    Nothing extremely offensive, shocking, or illegal
                  </Trans>
                </Heading>
              </HStack>
            </Stack>
          </Stack>
          <Box>
            <Text fontSize='md' color='gray.100'>
              <Trans>Upstanding netizens will read the{' '}
                <Link
                  color='teal.300'
                  fontSize='md'
                  isExternal
                  href={CLUB_GUIDELINES}
                >
                  Club Guidelines
                </Link>{' '}carefully before posting
              </Trans>
            </Text>
          </Box>
        </Stack>
      </>
    )
  }

  // If the post was already submitted
  if (postData?.state !== 'DRAFT') {
    return (
      <PostPlaceholder>
        <Stack spacing={4} align='center'>
          <Icon
            w={12}
            h={12}
            icon={PauseCircle}
            fill='orange.300'
          />
          <Box>
            <Heading color='gray.00' fontSize='4xl'>
              <Trans>
                This post was already submitted
              </Trans>
            </Heading>
          </Box>
          <Button
            colorScheme='orange'
            variant='solid'
            size='lg'
            onClick={() => router.back()}
          >
            <Trans>
              Go back
            </Trans>
          </Button>
        </Stack>
      </PostPlaceholder>
    )
  }

  // When there is a valid post we load the post creator flow
  return (
    <UpdatePostFlow
      query={postData}
    />
  )
}
