import type { SupportClubModalFragment$key } from '@//:artifacts/SupportClubModalFragment.graphql'
import type { SupportClubModalViewerFragment$key } from '@//:artifacts/SupportClubModalViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text } from '@chakra-ui/react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import Can from '@//:modules/authorization/Can'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'
import SupportClubTransactionProcess from '../SupportClubTransactionProcess/SupportClubTransactionProcess'
import SupportClubPriceButton from '../SupportClubPriceButton/SupportClubPriceButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { useRef } from 'react'

interface Props {
  clubQuery: SupportClubModalFragment$key
  viewerQuery: SupportClubModalViewerFragment$key
}

const ClubFragment = graphql`
  fragment SupportClubModalFragment on Club {
    viewerMember {
      isSupporter
      clubSupporterSubscription {
        ...on IAccountClubSupporterSubscription {
          reference
        }
      }
    }
    canSupport
    ...SupportClubTransactionProcessFragment
    ...SupportClubPriceButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportClubModalViewerFragment on Account {
    ...SupportClubTransactionProcessViewerFragment
  }
`

export default function SupportClubModal ({
  clubQuery,
  viewerQuery
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

  const SupporterPublicButton = (): JSX.Element => {
    if (clubData.viewerMember?.isSupporter === true) {
      return (
        <Stack spacing={1}>
          <LinkButton
            colorScheme='gray'
            size='lg'
            w='100%'
            href={clubData?.viewerMember?.clubSupporterSubscription != null
              ? {
                  pathname: '/settings/billing/subscription/[reference]',
                  query: { reference: clubData.viewerMember.clubSupporterSubscription.reference }
                }
              : '/settings/billing/subscriptions'}
          >
            <Trans>
              Manage Subscription
            </Trans>
          </LinkButton>
          <Text fontSize='md' color='gray.00'>
            <Trans>
              Thanks for supporting this club! You can now access all of its exclusive content.
            </Trans>
          </Text>
        </Stack>
      )
    }

    if (!clubData.canSupport) {
      return <></>
    }

    return (
      <Stack spacing={1}>
        <Can I='interact' a='Club' passThrough>
          {allowed => (
            <SupportClubPriceButton
              isDisabled={allowed === false}
              onClick={onOpen}
              query={clubData}
            />
          )}
        </Can>
        <Text fontSize='md' color='gray.00'>
          <Trans>
            Support this club and get access to all of its exclusive content!
          </Trans>
        </Text>
      </Stack>
    )
  }

  useUpdateEffect(() => {
    if (!isOpen) {
      supportParam != null && setSupportParam(undefined)
    }
  }, [isOpen])

  return (
    <HistoryDisclosureProvider {...methods}>
      <SupporterPublicButton />
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
