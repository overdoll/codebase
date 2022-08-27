import { graphql } from 'react-relay'
import { RoulettePostClubFragment$key } from '@//:artifacts/RoulettePostClubFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Heading, HStack } from '@chakra-ui/react'
import { ResourceIcon } from '@//:modules/content/PageLayout'

interface Props {
  query: RoulettePostClubFragment$key
}

const Fragment = graphql`
  fragment RoulettePostClubFragment on Club {
    id
    banner {
      ...ResourceIconFragment
    }
    name
  }
`

export default function RoulettePostClub (props: Props): JSX.Element {
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
