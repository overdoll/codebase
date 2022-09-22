import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ClubPublicPostFragment$key } from '@//:artifacts/ClubPublicPostFragment.graphql'
import { ClubPublicPostViewerFragment$key } from '@//:artifacts/ClubPublicPostViewerFragment.graphql'
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { Link } from '@//:modules/routing'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import JoinClubPublicPost from './JoinClubPublicPost/JoinClubPublicPost'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

interface Props {
  postQuery: ClubPublicPostFragment$key
  viewerQuery: ClubPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment ClubPublicPostFragment on Post {
    club {
      id
      name
      slug
      ...ClubIconFragment
      ...JoinClubPublicPostFragment
    }
    description
  }
`

const ViewerFragment = graphql`
  fragment ClubPublicPostViewerFragment on Account {
    ...JoinClubPublicPostViewerFragment
  }
`

export default function ClubPublicPost (props: Props): JSX.Element {
  const {
    postQuery,
    viewerQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const onClick = (): void => {
    // track club link clicks
    trackFathomEvent('U1AWMVCU', 1)
  }

  return (
    <Flex position='relative'>
      <Link
        onClick={onClick}
        passHref
        href={{
          pathname: '/[slug]',
          query: {
            slug: postData.club.slug
          }
        }}
      >
        <Box position='absolute' top={0} bottom={0} left={0} right={0} as='a' />
      </Link>
      <Flex w='100%' align='center' direction='column'>
        <HStack w='100%' align='center' justify='space-between'>
          <HStack justify='center'>
            <ClubIcon size='lg' clubQuery={postData.club} />
            <Flex justify='center' direction='column'>
              <Heading noOfLines={1} fontSize='lg' color='gray.100'>
                {postData.club.name}
              </Heading>
              <Text noOfLines={1} fontSize='sm' color='gray.300'>
                overdoll.com/{postData.club.slug}
              </Text>
            </Flex>
          </HStack>
          <JoinClubPublicPost clubQuery={postData.club} viewerQuery={viewerData} />
        </HStack>
        {postData.description.length > 0 && (
          <Text mt={1} lineHeight='20px' fontSize='sm' color='gray.200'>
            {postData.description}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}
