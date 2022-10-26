import { ClubSupportSelectMethodFragment$key } from '@//:artifacts/ClubSupportSelectMethodFragment.graphql'
import { ClubSupportSelectMethodViewerFragment$key } from '@//:artifacts/ClubSupportSelectMethodViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { useEffect, useRef } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import posthog from 'posthog-js'
import SupportSelectMethod from './SupportSelectMethod/SupportSelectMethod'
import ClubSupportModal from '../ClubSupportModal/ClubSupportModal'

interface Props {
  clubQuery: ClubSupportSelectMethodFragment$key
  viewerQuery: ClubSupportSelectMethodViewerFragment$key
}

const ClubFragment = graphql`
  fragment ClubSupportSelectMethodFragment on Club {
    ...SupportSelectMethodFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubSupportSelectMethodViewerFragment on Account {
    ...SupportSelectMethodViewerFragment
  }
`

export default function ClubSupportSelectMethod (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)
  const [supportParam] = useQueryParam<boolean | null | undefined>('support')
  const [tokenParam] = useQueryParam<string | null | undefined>('token')

  const closeButtonRef = useRef(null)

  const methods = useDisclosure({
    onOpen () {
      posthog?.capture('open-support-modal')
    }
  })

  const {
    isOpen,
    onClose,
    onOpen
  } = methods

  useEffect(() => {
    if (!isOpen && supportParam != null && tokenParam == null) {
      onOpen()
    } else if (isOpen && supportParam == null) {
      onClose()
    } else if (isOpen && tokenParam != null) {
      onClose()
    }
  }, [isOpen, supportParam, tokenParam])

  return (
    <ClubSupportModal isOpen={isOpen} onClose={onClose} initialFocusRef={closeButtonRef}>
      <SupportSelectMethod closeButtonRef={closeButtonRef} clubQuery={clubData} viewerQuery={viewerData} />
    </ClubSupportModal>
  )
}
