import { Skeleton, Stack } from '@chakra-ui/react'

export default function SkeletonPost (): JSX.Element {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Skeleton h={8} w='100%' />
        <Skeleton
          borderRadius='md'
          h='75vh'
          w='100%'
        />
        <Skeleton h={8} w='100%' />
      </Stack>
      <Stack spacing={1}>
        <Skeleton h={8} w='100%' />
        <Skeleton
          borderRadius='md'
          h='75vh'
          w='100%'
        />
        <Skeleton h={8} w='100%' />
      </Stack>
    </Stack>
  )
}
