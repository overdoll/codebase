import { ReactNode, Suspense } from 'react'
import CenteredSpinner from '@//:modules/content/Placeholder/Loading/CenteredSpinner/CenteredSpinner'
import { Box } from '@chakra-ui/react'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'

interface Props {
  children: ReactNode
}

export default function PageContents ({ children }: Props): JSX.Element {
  /*
  adding these two properties
  position='absolute'
  overflowY='auto'
  so that the container is "under" the nav bar as opposed to
  having the scroll bar fit the entire page will not reset the scroll
  position when a router change happens

  find a suitable workaround and add the two properties back for styling
   */

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
