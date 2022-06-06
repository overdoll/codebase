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

export interface UseHistoryDisclosurePropsReturn extends Omit<UseDisclosureReturn, 'onClose' | 'onToggle'> {
  onClose: () => void
  onToggle: () => void
}

export default function useHistoryDisclosure (props: UseHistoryDisclosureProps = {}): UseHistoryDisclosurePropsReturn {
  const {
    hash,
    ...rest
  } = props

  // TODO commenting out the primary function because adding a hash to the url will break SSR???
  // TODO need to find a better way to write this with nextjs

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
    // TODO doing a push wont add to the history stack
    // void router.push(router.asPath, undefined, { shallow: true })
    onOpenAction()
    /*
    const extractedHash = router.asPath.split('#')?.[1]
    if (extractedHash?.includes(defineHash)) return

    void router.push({
      pathname: router.pathname,
      hash: defineHash,
      query: router.query
    }, undefined, { shallow: true })

     */
  }

  const onClose = (): void => {
    onCloseAction()
    // TODO handle this better
    // TODO cancel rendering route error happens when you close modal and then redirect a user to another page
    // TODO also it causes the page to re-render which is not ideal (even though shallow is enabled)
    /*
    if (push === false) return
    const extractedHash = router.asPath.split('#')?.[1]
    if (extractedHash?.includes(defineHash)) {
      void router.replace({
        pathname: router.pathname,
        query: router.query
      }, undefined, { shallow: true })
    }

     */
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
    router.beforePopState(({
      url,
      as,
      options
    }) => {
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
