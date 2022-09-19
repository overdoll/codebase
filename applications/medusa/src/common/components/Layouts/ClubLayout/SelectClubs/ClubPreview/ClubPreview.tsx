import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import type { ClubPreviewFragment$key } from '@//:artifacts/ClubPreviewFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: ClubPreviewFragment$key
}

const Fragment = graphql`
  fragment ClubPreviewFragment on Club {
    name
    slug
    ...ClubIconFragment
  }
`

export default function ClubPreview ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack
      spacing={2}
      align='center'
    >
      <ClubIcon size='md' clubQuery={data} />
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
    </Stack>
  )
}
