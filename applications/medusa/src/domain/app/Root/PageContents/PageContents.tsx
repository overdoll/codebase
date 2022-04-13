import { ReactNode, Suspense } from 'react'
import CenteredSpinner from '@//:modules/content/Placeholder/Loading/CenteredSpinner/CenteredSpinner'
import { Box } from '@chakra-ui/react'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'

interface Props {
  children: ReactNode
}

export default function PageContents ({ children }: Props): JSX.Element {
  return (
    <Box
      left={0}
      right={0}
      top={{
        base: 0,
        md: 54
      }}
      bottom={{
        base: 54,
        md: 0
      }}
      position='absolute'
      overflowY='auto'
      overflowX='hidden'
    >
      <Box>
        <ErrorBoundary fallback='error'>
          <Suspense fallback={<CenteredSpinner />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Box>
  )
}
