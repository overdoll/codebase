import { Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import { RawCinematicContent } from '@//:modules/content/HookedComponents/Post'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: PostPreviewFragment$key
}

const Fragment = graphql`
  fragment PostPreviewFragment on Post {
    club {
      name
      slug
      ...ClubIconFragment
    }
    description
    ...RawCinematicContentFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2} direction='column'>
      <HStack justify='center'>
        <ClubIcon size='md' clubQuery={data.club} />
        <Flex justify='center' direction='column'>
          <Heading noOfLines={1} fontSize='md' color='gray.100'>
            {data.club.name}
          </Heading>
          <Text noOfLines={1} fontSize='sm' color='gray.300'>
            overdoll.com/{data.club.slug}
          </Text>
        </Flex>
      </HStack>
      {data.description.length > 0 && (
        <Text mt={1} lineHeight='20px' fontSize='sm' color='gray.200'>
          {data.description}
        </Text>
      )}
      <RawCinematicContent postQuery={data} />
    </Stack>
  )
}
