import SkeletonDropdownMenuButton
  from '../../../../modules/content/Placeholder/Loading/SkeletonDropdownMenuButton/SkeletonDropdownMenuButton'
import React, { Suspense } from 'react'
import ClubsDisplay from './ClubsDisplay/ClubsDisplay'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import { Flex } from '@chakra-ui/react'

export default function RootClubsDisplay (): JSX.Element {
  return (
    <Flex
      w='100%'
    >
      <ErrorBoundary fallback={<></>}>
        <Suspense fallback={
          <SkeletonDropdownMenuButton />
        }
        >
          <ClubsDisplay />
        </Suspense>
      </ErrorBoundary>
    </Flex>
  )
}
