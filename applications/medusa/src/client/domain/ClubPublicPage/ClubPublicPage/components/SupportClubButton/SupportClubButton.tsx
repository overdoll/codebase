import type { SupportClubButtonClubFragment$key } from '@//:artifacts/SupportClubButtonClubFragment.graphql'
import type { SupportClubButtonViewerFragment$key } from '@//:artifacts/SupportClubButtonViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { ButtonProps, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from './helpers/displayPrice'
import { useHistoryDisclosure } from '@//:modules/hooks'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import SupportSelectMethod from './components/SupportSelectMethod/SupportSelectMethod'

interface Props extends ButtonProps {
  clubQuery: SupportClubButtonClubFragment$key
  viewerQuery: SupportClubButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment SupportClubButtonClubFragment on Club {
    viewerMember {
      isSupporter
    }
    supporterSubscriptionPrice {
      localizedPrice {
        amount
        currency
      }
    }
    ...SupportSelectMethodFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportClubButtonViewerFragment on Account {
    __typename
    ...SupportSelectMethodViewerFragment
  }
`

export default function SupportClubButton ({
  clubQuery,
  viewerQuery,
  ...rest
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const price = displayPrice({
    amount: clubData.supporterSubscriptionPrice.localizedPrice.amount,
    currency: clubData.supporterSubscriptionPrice.localizedPrice.currency,
    locale: locale
  })

  const buttonProps = {
    children: (
      <Trans>
        Become a Supporter {price}/mo
      </Trans>),
    colorScheme: 'orange',
    size: 'lg'
  }

  if (clubData.viewerMember?.isSupporter === true) {
    return (
      <Button
        colorScheme='gray'
        size='lg'
        {...rest}
      >
        <Trans>
          Manage Subscriptions
        </Trans>
      </Button>
    )
  }

  if (viewerData == null) {
    return (
      <LinkButton
        to='/join'
        {...buttonProps}
        {...rest}
      />
    )
  }

  const methods = useHistoryDisclosure()

  const {
    isOpen,
    onClose,
    onOpen
  } = methods

  return (
    <HistoryDisclosureProvider {...methods}>
      <Button
        onClick={onOpen}
        {...buttonProps}
        {...rest}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        motionPreset='none'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody my={3}>
            <SupportSelectMethod clubQuery={clubData} viewerQuery={viewerData} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </HistoryDisclosureProvider>
  )
}
