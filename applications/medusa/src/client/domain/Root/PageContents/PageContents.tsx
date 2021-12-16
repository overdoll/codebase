import { ReactNode, Suspense } from 'react'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import { Box, Flex } from '@chakra-ui/react'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'

interface Props {
  children: ReactNode
}

export default function PageContents ({ children }: Props): JSX.Element {
  return (
    <Flex direction={{
      base: 'column',
      md: 'row'
    }}
    >
      <Box
        className='page-contents'
        w='100%'
      >
        <ErrorBoundary fallback='error'>
          <Suspense fallback={<CenteredSpinner />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Flex>
  )
}
