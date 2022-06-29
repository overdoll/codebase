import { HStack, Skeleton, Stack } from '@chakra-ui/react'
import { SEARCH_SLIDE_HEIGHT, SEARCH_SLIDE_WIDTH } from '../../constants'

export const SlideSkeleton = (): JSX.Element => {
  return (
    <HStack spacing={4}>
      <Skeleton
        borderRadius='md'
        h={SEARCH_SLIDE_HEIGHT}
        w={SEARCH_SLIDE_WIDTH}
      />
      <Skeleton
        borderRadius='md'
        h={SEARCH_SLIDE_HEIGHT}
        w={SEARCH_SLIDE_WIDTH}
      />
      <Skeleton
        borderRadius='md'
        h={SEARCH_SLIDE_HEIGHT}
        w={SEARCH_SLIDE_WIDTH}
      />
    </HStack>
  )
}

export const RecommendationsSkeleton = (): JSX.Element => {
  return (
    <Stack spacing={4}>
      <SlideSkeleton />
      <SlideSkeleton />
      <SlideSkeleton />
    </Stack>
  )
}
