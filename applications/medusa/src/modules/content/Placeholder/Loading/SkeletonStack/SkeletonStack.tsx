import { Skeleton, Stack } from '@chakra-ui/react'

export default function SkeletonStack (): JSX.Element {
  return (
    <Stack spacing={2}>
      <Skeleton
        h={58}
        borderRadius='md'
        w='100%'
      />
      <Skeleton
        h={58}
        borderRadius='md'
        w='100%'
      />
      <Skeleton
        h={58}
        borderRadius='md'
        w='100%'
      />
    </Stack>
  )
}
