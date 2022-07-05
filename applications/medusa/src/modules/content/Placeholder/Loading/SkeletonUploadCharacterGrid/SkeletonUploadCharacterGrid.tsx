import { Skeleton } from '@chakra-ui/react'
import { GridTile } from '../../../ContentSelection'
import ShortGridWrap from '../../../ContentSelection/ShortGridWrap/ShortGridWrap'

export default function SkeletonUploadCharacterGrid (): JSX.Element {
  return (
    <ShortGridWrap>
      <GridTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </GridTile>
      <GridTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </GridTile>
      <GridTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </GridTile>
      <GridTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </GridTile>
      <GridTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </GridTile>
    </ShortGridWrap>
  )
}
