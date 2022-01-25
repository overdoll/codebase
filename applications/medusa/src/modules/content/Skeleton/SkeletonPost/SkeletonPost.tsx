import { Box, Skeleton, Stack } from '@chakra-ui/react'

export default function SkeletonPost (): JSX.Element {
  return (
    <Box p={2}>
      <Stack spacing={3}>
        <Skeleton h={8} w='100%' />
        <Skeleton
          borderRadius='md'
          h='60vh'
          w='100%'
        />
        <Skeleton h={8} w='100%' />
      </Stack>
    </Box>
  )
}
