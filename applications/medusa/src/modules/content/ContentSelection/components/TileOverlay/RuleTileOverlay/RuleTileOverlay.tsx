import { Box, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { RuleTileOverlayFragment$key } from '@//:artifacts/RuleTileOverlayFragment.graphql'

interface Props {
  query: RuleTileOverlayFragment$key
}

const Fragment = graphql`
  fragment RuleTileOverlayFragment on Rule {
    title
    description
  }
`

export default function RuleTileOverlay ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box px={4} py={3} bg='gray.900' borderRadius='inherit'>
      <Text
        fontSize='lg'
        color='gray.00'
      >
        {data.title}
      </Text>
      <Text fontSize='sm' color='gray.200'>
        {data.description}
      </Text>
    </Box>

  )
}
