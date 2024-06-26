import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { CharacterTileOverlayFragment$key } from '@//:artifacts/CharacterTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import CharacterBanner from '../../../PageLayout/Display/fragments/Banner/CharacterBanner/CharacterBanner'

interface Props {
  query: CharacterTileOverlayFragment$key
}

const Fragment = graphql`
  fragment CharacterTileOverlayFragment on Character {
    name
    series {
      title
    }
    club {
      name
    }
    ...CharacterBannerFragment
  }
`

export default function CharacterTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={<CharacterBanner characterQuery={data} />}>
      {data.club != null && (
        <Flex position='absolute' p={2} right={0} bottom={0} justify='flex-end'>
          <Box bg='teal.300' borderRadius='xl' px={2} py={1}>
            <Heading color='gray.00' fontSize='sm'>
              OC
            </Heading>
          </Box>
        </Flex>
      )}
      <Stack px={1} py={2} w='100%' h='100%' align='center' justify='center' spacing={0}>
        <Text
          fontSize={{
            base: 'sm',
            md: 'lg'
          }}
          color='gray.00'
          textAlign='center'
          noOfLines={2}
          whiteSpace='normal'
          wordBreak='break-word'
        >
          {data.name}
        </Text>
        <Text
          textAlign='center'
          fontSize={{
            base: '2xs',
            md: 'sm'
          }}
          color='gray.100'
          noOfLines={2}
          whiteSpace='normal'
          wordBreak='break-word'
        >
          {data.series?.title ?? data.club?.name}
        </Text>
      </Stack>
    </TileOverlay>
  )
}
