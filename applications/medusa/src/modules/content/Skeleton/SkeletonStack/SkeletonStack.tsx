import { Skeleton } from '@chakra-ui/react'
import { RowItem, RowWrap } from '../../../../client/components/ContentSelection'

export default function SkeletonStack (): JSX.Element {
  return (
    <RowWrap>
      <RowItem>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </RowItem>
      <RowItem>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </RowItem>
      <RowItem>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </RowItem>
    </RowWrap>
  )
}
