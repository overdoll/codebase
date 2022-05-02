import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import type { ClubPreviewFragment$key } from '@//:artifacts/ClubPreviewFragment.graphql'

import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'
import { ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  query: ClubPreviewFragment$key
}

const Fragment = graphql`
  fragment ClubPreviewFragment on Club {
    id
    name
    slug
    thumbnail {
      ...ResourceIconFragment
    }
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
      <ResourceIcon
        seed={data.id}
        mr={3}
        query={data?.thumbnail as ResourceIconFragment$key}
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
          color='gray.200'
          fontSize='sm'
        >
          /{data.slug}
        </Text>
      </Box>
    </Flex>
  )
}
