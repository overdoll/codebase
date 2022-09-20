import { graphql, useFragment } from 'react-relay/hooks'
import { PreviewCharacterFragment$key } from '@//:artifacts/PreviewCharacterFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { TileOverlay } from '../../../../../ContentSelection'
import CharacterThumbnail
  from '../../../../../PageLayout/Display/fragments/Thumbnail/CharacterThumbnail/CharacterThumbnail'

interface Props {
  characterQuery: PreviewCharacterFragment$key
}

const Fragment = graphql`
  fragment PreviewCharacterFragment on Character {
    name
    ...CharacterThumbnailFragment
  }
`

export default function PreviewCharacter (props: Props): JSX.Element {
  const { characterQuery } = props

  const data = useFragment(Fragment, characterQuery)

  return (
    <TileOverlay
      backdrop={<CharacterThumbnail characterQuery={data} />}
    >
      <Stack px={2} align='center' justify='center' minH={100}>
        <Heading
          fontSize={{
            base: '2xs',
            md: 'xs'
          }}
          wordBreak='break-all'
          color='whiteAlpha.800'
          textAlign='center'
        >
          {data.name}
        </Heading>
      </Stack>
    </TileOverlay>
  )
}
