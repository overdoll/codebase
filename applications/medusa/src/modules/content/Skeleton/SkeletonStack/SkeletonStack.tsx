import { Skeleton, Stack } from '@chakra-ui/react'

export default function SkeletonStack (): JSX.Element {
  return (
    <Stack spacing={2}>
      <Skeleton
        borderRadius={5}
        h={12}
      />
      <Skeleton
        borderRadius={5}
        h={12}
      />
      <Skeleton
        borderRadius={5}
        h={12}
      />
    </Stack>
  )
}
