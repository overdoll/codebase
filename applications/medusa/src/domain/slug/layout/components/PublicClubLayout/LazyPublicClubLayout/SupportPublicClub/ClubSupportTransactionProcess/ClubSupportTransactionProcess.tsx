import { useQueryParam } from 'use-query-params'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import QueryErrorBoundary
  from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense, useEffect, useRef } from 'react'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import CCBillDisplayTransaction
  from './CCBillDisplayTransaction/CCBillDisplayTransaction'
import { useDisclosure } from '@chakra-ui/react'
import ClubSupportModal from '../ClubSupportModal/ClubSupportModal'

interface SearchProps {
  token: string | null
}

export default function ClubSupportTransactionProcess (): JSX.Element {
  const [tokenParam] = useQueryParam<string | null | undefined>('token')

  const closeButtonRef = useRef(null)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const {
    searchArguments,
    setArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      token: (tokenParam != null ? tokenParam : null)
    }
  })

  useEffect(() => {
    // close token modal if its empty
    if (tokenParam == null) {
      setArguments({ token: null })
      onClose()
      return
    }

    // open token modal if not empty
    setArguments({ token: tokenParam })
    onOpen()
  }, [tokenParam])

  return (
    <ClubSupportModal initialFocusRef={closeButtonRef} isOpen={isOpen} onClose={onClose}>
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonStack />}>
          <CCBillDisplayTransaction
            onClose={onClose}
            closeButtonRef={closeButtonRef}
            loadQuery={loadQuery}
            searchArguments={searchArguments}
          />
        </Suspense>
      </QueryErrorBoundary>
    </ClubSupportModal>
  )
}
