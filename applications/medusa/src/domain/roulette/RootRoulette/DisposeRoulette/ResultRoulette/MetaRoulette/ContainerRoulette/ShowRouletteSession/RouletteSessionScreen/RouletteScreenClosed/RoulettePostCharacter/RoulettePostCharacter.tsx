import { graphql } from 'react-relay'
import { RoulettePostCharacterFragment$key } from '@//:artifacts/RoulettePostCharacterFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Heading, HStack } from '@chakra-ui/react'
import CharacterIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/CharacterIcon/CharacterIcon'

interface Props {
  query: RoulettePostCharacterFragment$key
}

const Fragment = graphql`
  fragment RoulettePostCharacterFragment on Character {
    name
    ...CharacterIconFragment
  }
`

export default function RoulettePostCharacter (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  return (
    <HStack align='center' spacing={2}>
      <CharacterIcon characterQuery={data} />
      <Heading fontSize='xl' color='gray.00'>
        {data.name}
      </Heading>
    </HStack>
  )
}
