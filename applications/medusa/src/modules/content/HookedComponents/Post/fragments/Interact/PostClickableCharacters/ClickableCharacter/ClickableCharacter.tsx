import { graphql, useFragment } from 'react-relay/hooks'
import { ClickableCharacterFragment$key } from '@//:artifacts/ClickableCharacterFragment.graphql'
import { Heading, HStack } from '@chakra-ui/react'
import { SmallBackgroundBox } from '../../../../../../PageLayout'
import CharacterLinkTile from '../../../../../../PageLayout/Display/fragments/Link/CharacterLinkTile/CharacterLinkTile'

interface Props {
  query: ClickableCharacterFragment$key
}

const Fragment = graphql`
  fragment ClickableCharacterFragment on Character {
    name
    ...CharacterLinkTileFragment
  }
`

export default function ClickableCharacter ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <CharacterLinkTile query={data}>
      <SmallBackgroundBox p={2} borderRadius='inherit'>
        <HStack spacing={2} align='center'>
          <Heading noOfLines={1} color='gray.100' fontSize='xl'>
            {data.name}
          </Heading>
        </HStack>
      </SmallBackgroundBox>
    </CharacterLinkTile>
  )
}
