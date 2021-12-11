/**
 * @flow
 */
import { Skeleton, Stack } from '@chakra-ui/react'
import type { Node } from 'react'

export default function SkeletonStack (): Node {
  return (
    <Stack spacing={2}>
      <Skeleton borderRadius={5} h={12} />
      <Skeleton borderRadius={5} h={12} />
      <Skeleton borderRadius={5} h={12} />
    </Stack>
  )
}
