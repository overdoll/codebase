import { Skeleton } from '@chakra-ui/react'
import ShortGridWrap from '../../../ContentSelection/ShortGridWrap/ShortGridWrap'
import ShortGridTile from '../../../ContentSelection/ShortGridTile/ShortGridTile'

export default function SkeletonUploadCategoryGrid (): JSX.Element {
  return (
    <ShortGridWrap>
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
    </ShortGridWrap>
  )
}
