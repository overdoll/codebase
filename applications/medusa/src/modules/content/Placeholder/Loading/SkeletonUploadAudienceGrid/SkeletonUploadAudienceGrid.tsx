import { Skeleton } from '@chakra-ui/react'
import ShortGridTile from '../../../ContentSelection/ShortGridTile/ShortGridTile'
import { GridWrap } from '../../../ContentSelection'

export default function SkeletonUploadAudienceGrid (): JSX.Element {
  return (
    <GridWrap>
      <ShortGridTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </ShortGridTile>
      <ShortGridTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </ShortGridTile>
      <ShortGridTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </ShortGridTile>
    </GridWrap>
  )
}
