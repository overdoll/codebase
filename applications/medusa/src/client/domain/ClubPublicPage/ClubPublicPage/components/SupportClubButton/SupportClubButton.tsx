import type { SupportClubButtonClubFragment$key } from '@//:artifacts/SupportClubButtonClubFragment.graphql'
import type { SupportClubButtonViewerFragment$key } from '@//:artifacts/SupportClubButtonViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { ButtonProps, Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '../../../../../../modules/support/displayPrice'
import { useHistoryDisclosure } from '@//:modules/hooks'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import SupportSelectMethod from './SupportSelectMethod/SupportSelectMethod'
import Can from '@//:modules/authorization/Can'
import { useQueryParam } from 'use-query-params'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar } from '@//:assets/icons'
import { useUpdateEffect } from 'usehooks-ts'

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
  const [supportParam, setSupportParam] = useQueryParam<boolean | null | undefined>('support')

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
    size: 'lg',
    leftIcon: (
      <Icon
        icon={PremiumStar}
        fill='orange.900'
        h={4}
        w={4}
      />)
  }

  if (viewerData == null) {
    return (
      <Stack spacing={1}>
        <Text fontSize='md' color='gray.00'>
          <Trans>
            Create an account and become a supporter to get access to this club's exclusive content!
          </Trans>
        </Text>
        <LinkButton
          to='/join'
          {...buttonProps}
          {...rest}
        />
      </Stack>
    )
  }

  const methods = useHistoryDisclosure({
    defaultIsOpen: supportParam != null
  })

  const {
    isOpen,
    onClose,
    onOpen
  } = methods

  useUpdateEffect(() => {
    if (!isOpen) {
      setSupportParam(undefined)
    }
  }, [isOpen])

  return (
    <HistoryDisclosureProvider {...methods}>
      {clubData.viewerMember?.isSupporter === true
        ? (
          <Stack spacing={1}>
            <Text fontSize='md' color='gray.00'>
              <Trans>
                Thanks for supporting this club! You can now access all of its exclusive content.
              </Trans>
            </Text>
            <LinkButton
              colorScheme='gray'
              size='lg'
              w='100%'
              {...rest}
              to='/settings/billing/subscriptions'
            >
              <Trans>
                My Subscriptions
              </Trans>
            </LinkButton>
          </Stack>)
        : (
          <Stack spacing={1}>
            <Text fontSize='md' color='gray.00'>
              <Trans>
                Support this club and get access to all of its exclusive content!
              </Trans>
            </Text>
            <Can I='interact' a='Club' passThrough>
              {allowed => (
                <Button
                  isDisabled={allowed === false}
                  onClick={onOpen}
                  {...buttonProps}
                  {...rest}
                />)}
            </Can>
          </Stack>
          )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
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
