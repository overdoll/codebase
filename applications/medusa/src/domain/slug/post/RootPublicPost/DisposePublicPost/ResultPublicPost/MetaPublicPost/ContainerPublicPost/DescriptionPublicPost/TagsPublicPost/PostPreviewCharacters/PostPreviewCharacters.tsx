import { Grid, GridItem, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type {
  PostPreviewCharactersFragment$data,
  PostPreviewCharactersFragment$key
} from '@//:artifacts/PostPreviewCharactersFragment.graphql'
import { useLimiter } from '@//:modules/content/HookedComponents/Limiter'
import { DeepWritable } from 'ts-essentials'
import PreviewCharacter
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewCharacter/PreviewCharacter'
import CharacterLinkTile
  from '@//:modules/content/PageLayout/Display/fragments/Link/CharacterLinkTile/CharacterLinkTile'
import { useUpdateEffect } from 'usehooks-ts'
import { CHARACTER_LIMIT } from '../TagsPublicPost'

interface Props {
  postQuery: PostPreviewCharactersFragment$key
  isExpanded: boolean
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
  const {
    postQuery,
    isExpanded
  } = props

  const data = useFragment(Fragment, postQuery)

  const {
    constructedData,
    onExpand
  } = useLimiter<DeepWritable<PostPreviewCharactersFragment$data['characters']>>({
    data: data?.characters as DeepWritable<PostPreviewCharactersFragment$data['characters']> ?? [],
    amount: CHARACTER_LIMIT
  })

  const columns = ['minmax(90px, 400px)', 'minmax(90px, 350px)', 'minmax(70px, 230px)', 'minmax(70px, 170px)']

  useUpdateEffect(() => {
    isExpanded && onExpand()
  }, [isExpanded])

  return (
    <Stack w='100%' spacing={1}>
      <Grid
        w='100%'
        gap={1}
        templateColumns={constructedData.length > CHARACTER_LIMIT ? columns.join(' ') : constructedData.map((item, index) => columns[index]).join(' ')}
        templateRows={`repeat(${Math.ceil(constructedData.length / CHARACTER_LIMIT)}, 100px)`}
      >
        {constructedData.map((item) =>
          <GridItem key={item.id}>
            <CharacterLinkTile query={item}>
              <PreviewCharacter characterQuery={item} />
            </CharacterLinkTile>
          </GridItem>
        )}
      </Grid>
    </Stack>
  )
}
