import type { ClubSupportWrapperFragment$key } from '@//:artifacts/ClubSupportWrapperFragment.graphql'
import type { ClubSupportWrapperViewerFragment$key } from '@//:artifacts/ClubSupportWrapperViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'
import SupportClubTransactionProcess from './SupportClubTransactionProcess/SupportClubTransactionProcess'
import { useEffect, useRef } from 'react'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '@//:modules/support/runIfFunction'
import posthog from 'posthog-js'

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

  const methods = useDisclosure({
    defaultIsOpen: ((supportParam != null || tokenParam != null) && clubData.viewerMember?.isSupporter !== true && clubData.canSupport),
    onOpen () {
      posthog?.capture('open-support-modal')
    },
    onClose () {
      posthog?.capture('close-support-modal')
    }
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

  useEffect(() => {
    if (isOpen && supportParam != null) {
      posthog?.capture('open-support-modal')
    }
  }, [isOpen, supportParam])

  return (
    <HistoryDisclosureProvider {...methods}>
      {runIfFunction(children, {
        onSupport: () => {
          onOpen()
        },
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
        scrollBehavior='inside'
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
