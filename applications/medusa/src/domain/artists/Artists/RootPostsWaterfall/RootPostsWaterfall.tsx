import SkeletonDropdownMenuButton
  from '../../../../modules/content/Placeholder/Loading/SkeletonDropdownMenuButton/SkeletonDropdownMenuButton'
import React, { Suspense } from 'react'
import PostsWaterfall from './PostsWaterfall/PostsWaterfall'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import { Flex } from '@chakra-ui/react'

export default function RootPostsWaterfall (): JSX.Element {
  return (
    <Flex
      filter='blur(6px)'
      h='100%'
      w='100%'
      top={0}
      opacity={0.4}
      align='center'
      justify='center'
      position='fixed'
      bg='gray.00'
    >
      <ErrorBoundary fallback={<></>}>
        <Suspense fallback={
          <SkeletonDropdownMenuButton />
        }
        >
          <PostsWaterfall />
        </Suspense>
      </ErrorBoundary>
    </Flex>
  )
}
