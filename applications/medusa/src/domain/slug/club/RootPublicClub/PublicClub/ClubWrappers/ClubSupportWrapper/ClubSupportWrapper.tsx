import type { ClubSupportWrapperFragment$key } from '@//:artifacts/ClubSupportWrapperFragment.graphql'
import type { ClubSupportWrapperViewerFragment$key } from '@//:artifacts/ClubSupportWrapperViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'
import SupportClubTransactionProcess
  from '../../ClubConditionalPostDisplay/SupportClubButton/SupportClubTransactionProcess/SupportClubTransactionProcess'
import { useRef } from 'react'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '@//:modules/support/runIfFunction'

interface ChildrenCallable {
  onSupport: () => void
  canSupport: boolean
}

interface Props {
  clubQuery: ClubSupportWrapperFragment$key
  viewerQuery: ClubSupportWrapperViewerFragment$key
  children: MaybeRenderProp<ChildrenCallable>
}

const ClubFragment = graphql`
  fragment ClubSupportWrapperFragment on Club {
    viewerMember {
      isSupporter
    }
    canSupport
    ...SupportClubTransactionProcessFragment
    ...SupportClubPriceButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubSupportWrapperViewerFragment on Account {
    ...SupportClubTransactionProcessViewerFragment
  }
`

export default function ClubSupportWrapper ({
  clubQuery,
  viewerQuery,
  children
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)
  const [supportParam, setSupportParam] = useQueryParam<boolean | null | undefined>('support')
  const [tokenParam] = useQueryParam<string | null | undefined>('token')

  const closeButtonRef = useRef(null)

  const methods = useHistoryDisclosure({
    defaultIsOpen: (supportParam != null || tokenParam != null) && clubData.viewerMember?.isSupporter !== true && clubData.canSupport
  })

  const {
    isOpen,
    onClose,
    onOpen
  } = methods

  useUpdateEffect(() => {
    if (!isOpen) {
      supportParam != null && setSupportParam(undefined)
    }
  }, [isOpen])

  return (
    <HistoryDisclosureProvider {...methods}>
      {runIfFunction(children, {
        onSupport: onOpen,
        canSupport: clubData.canSupport
      })}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        initialFocusRef={closeButtonRef}
        size={{
          base: 'full',
          md: 'xl'
        }}
        isCentered
        scrollBehavior='outside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody display='flex' alignItems='center' p={3}>
            <SupportClubTransactionProcess
              closeButtonRef={closeButtonRef}
              clubQuery={clubData}
              viewerQuery={viewerData}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </HistoryDisclosureProvider>
  )
}
