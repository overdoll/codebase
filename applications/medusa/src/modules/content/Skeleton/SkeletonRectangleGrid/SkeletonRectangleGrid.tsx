import { Skeleton } from '@chakra-ui/react'
import { GridWrap, RectangleGridItem } from '../../../../client/components/ContentSelection'

export default function SkeletonRectangleGrid (): JSX.Element {
  return (
    <GridWrap>
      <RectangleGridItem>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </RectangleGridItem>
      <RectangleGridItem>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </RectangleGridItem>
      <RectangleGridItem>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </RectangleGridItem>
    </GridWrap>
  )
}
