import { Skeleton } from '@chakra-ui/react'
import { GridTile, GridWrap } from '../../../ContentSelection'

export default function SkeletonRectangleGrid (): JSX.Element {
  return (
    <GridWrap>
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
    </GridWrap>
  )
}
