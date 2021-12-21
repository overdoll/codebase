import { ReactNode, Suspense } from 'react'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
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
      top={54}
      bottom={0}
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
