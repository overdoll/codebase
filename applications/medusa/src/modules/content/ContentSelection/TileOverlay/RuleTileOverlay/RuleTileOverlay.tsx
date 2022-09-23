import { Box, Collapse, Heading, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { RuleTileOverlayFragment$key } from '@//:artifacts/RuleTileOverlayFragment.graphql'
import RandomPattern from '../../../PageLayout/Display/components/RandomPattern/RandomPattern'
import TileOverlay from '../TileOverlay'

interface Props {
  query: RuleTileOverlayFragment$key
  isActive?: boolean | undefined
}

const Fragment = graphql`
  fragment RuleTileOverlayFragment on Rule {
    id
    title
    description
  }
`

export default function RuleTileOverlay ({
  query,
  isActive
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay
      maxH={24}
      backdrop={
        <RandomPattern seed={data.id} />
      }
    >
      <Box px={3} py={4} w='100%'>
        <Heading
          noOfLines={2}
          fontSize='lg'
          color='gray.00'
        >
          {data.title}
        </Heading>
        <Collapse in={isActive == null || isActive}>
          <Text noOfLines={3} fontSize='sm' color='gray.200'>
            {data.description}
          </Text>
        </Collapse>
      </Box>
    </TileOverlay>
  )
}
