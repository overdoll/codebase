import { Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type {
  PostPreviewCharactersFragment$data,
  PostPreviewCharactersFragment$key
} from '@//:artifacts/PostPreviewCharactersFragment.graphql'
import { useLimiter } from '@//:modules/content/HookedComponents/Limiter'
import { DeepWritable } from 'ts-essentials'
import PreviewCharacter
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewCharacter/PreviewCharacter'
import CharacterLinkTile from '@//:common/components/CharacterLinkTile/CharacterLinkTile'
import { Trans } from '@lingui/macro'

interface Props {
  postQuery: PostPreviewCharactersFragment$key
}

const Fragment = graphql`
  fragment PostPreviewCharactersFragment on Post {
    characters {
      id
      ...PreviewCharacterFragment
      ...CharacterLinkTileFragment
    }
  }
`

export default function PostPreviewCharacters (props: Props): JSX.Element {
  const { postQuery } = props

  const data = useFragment(Fragment, postQuery)

  const {
    constructedData,
    onExpand,
    hasExpansion,
    hiddenData
  } = useLimiter<DeepWritable<PostPreviewCharactersFragment$data['characters']>>({
    data: data?.characters as DeepWritable<PostPreviewCharactersFragment$data['characters']> ?? [],
    amount: 3
  })

  return (
    <Stack w='100%' spacing={1}>
      <Grid
        h='100%'
        w='100%'
        gap={1}
        templateColumns={`repeat(${constructedData.length}, minmax(50px, 200px))`}
        templateRows='1fr'
      >
        {constructedData.map((item) =>
          <GridItem key={item.id}>
            <CharacterLinkTile query={item}>
              <PreviewCharacter characterQuery={item} />
            </CharacterLinkTile>
          </GridItem>
        )}
      </Grid>
      {hasExpansion && (
        <Heading cursor='pointer' onClick={onExpand} color='gray.300' fontSize='md'>
          <Trans>
            See {hiddenData.length} more...
          </Trans>
        </Heading>
      )}
    </Stack>
  )
}
