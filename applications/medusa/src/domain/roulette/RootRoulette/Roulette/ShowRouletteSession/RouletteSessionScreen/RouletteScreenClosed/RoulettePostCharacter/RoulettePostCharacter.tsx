import { graphql } from 'react-relay'
import { RoulettePostCharacterFragment$key } from '@//:artifacts/RoulettePostCharacterFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Heading, HStack } from '@chakra-ui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  query: RoulettePostCharacterFragment$key
}

const Fragment = graphql`
  fragment RoulettePostCharacterFragment on Character {
    id
    banner {
      ...ResourceIconFragment
    }
    name
  }
`

export default function RoulettePostCharacter (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  return (
    <HStack align='center' spacing={2}>
      <ResourceIcon query={data.banner} seed={data.id} w={6} h={6} />
      <Heading fontSize='xl' color='gray.00'>
        {data.name}
      </Heading>
    </HStack>
  )
}
