import { Skeleton } from '@chakra-ui/react'
import { StackTile } from '../../../ContentSelection'
import { ListSpacer } from '../../../PageLayout'

export default function SkeletonStack (): JSX.Element {
  return (
    <ListSpacer>
      <StackTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </StackTile>
      <StackTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </StackTile>
      <StackTile>
        <Skeleton
          borderRadius='md'
          h='100%'
          w='100%'
        />
      </StackTile>
    </ListSpacer>
  )
}
