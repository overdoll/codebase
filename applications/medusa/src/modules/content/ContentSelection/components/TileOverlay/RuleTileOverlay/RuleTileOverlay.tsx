import { Stack, Text } from '@chakra-ui/react'
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
    <Stack bg='gray.800' spacing={1}>
      <Text
        fontSize='lg'
        color='gray.00'
      >
        {data.title}
      </Text>
      <Text fontSize='sm' color='gray.200'>
        {data.description}
      </Text>
    </Stack>
  )
}
