import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import type { ClubPreviewFragment$key } from '@//:artifacts/ClubPreviewFragment.graphql'

import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import ClubThumbnail from '@//:modules/content/DataDisplay/Club/ClubThumbnail/ClubThumbnail'

interface Props {
  query: ClubPreviewFragment$key
}

const Fragment = graphql`
  fragment ClubPreviewFragment on Club {
    name
    slug
    ...ClubThumbnailFragment
  }
`

export default function ClubPreview ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex
      align='center'
    >
      <ClubThumbnail
        w={10}
        h={10}
        mr={3}
        query={data}
      />
      <Box
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
      >
        <Heading
          fontSize='lg'
          color='gray.00'
        >
          {data.name}
        </Heading>
        <Text
          fontFamily='mono'
          color='gray.200'
          fontSize='sm'
        >
          /{data.slug}
        </Text>
      </Box>
    </Flex>
  )
}
