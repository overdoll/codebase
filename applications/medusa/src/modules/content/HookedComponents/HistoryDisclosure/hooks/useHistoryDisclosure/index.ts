import { useDisclosure, UseDisclosureProps, UseDisclosureReturn } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'usehooks-ts'

/**
 * useDisclosure hook modified so that when it is opened
 * identical entry into history is added and
 * when the back button is pressed its closed
 */

interface UseHistoryDisclosureProps extends UseDisclosureProps {
  hash?: string | undefined
}

export default function useHistoryDisclosure (props: UseHistoryDisclosureProps = {}): UseDisclosureReturn {
  const {
    hash,
    ...rest
  } = props

  const defineHash = hash == null ? 'modal' : hash

  const {
    isOpen,
    onOpen: onOpenAction,
    onClose: onCloseAction,
    onToggle: onToggleAction,
    ...restOfDisclosure
  } = useDisclosure({
    ...rest,
    id: defineHash
  })

  const router = useRouter()

  const onOpen = (): void => {
    onOpenAction()
    void router.push({
      pathname: router.pathname,
      hash: defineHash,
      query: router.query
    }, undefined, { shallow: true })
  }

  const onClose = (): void => {
    onCloseAction()
    const extractedHash = router.asPath.split('#')?.[1]
    if (extractedHash?.includes(defineHash)) {
      void router.replace({
        pathname: router.pathname,
        query: router.query
      }, undefined, { shallow: true })
    }
  }

  const onToggle = (): void => {
    if (isOpen) {
      onClose()
      return
    }
    onOpen()
  }

  // When it detects that the user clicked the Back button and the modal
  // is still open, it will close the modal for the user
  useUpdateEffect(() => {
    router.beforePopState(() => {
      if (isOpen) {
        onCloseAction()
      }
      return true
    })
  }, [isOpen])

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    ...restOfDisclosure
  }
}
