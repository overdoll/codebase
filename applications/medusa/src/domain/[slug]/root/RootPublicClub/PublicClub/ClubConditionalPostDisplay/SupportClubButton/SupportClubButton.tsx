import type { SupportClubButtonClubFragment$key } from '@//:artifacts/SupportClubButtonClubFragment.graphql'
import type { SupportClubButtonViewerFragment$key } from '@//:artifacts/SupportClubButtonViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import {
  Box,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text
} from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import displayPrice from '@//:modules/support/displayPrice'
import { useHistoryDisclosure } from '@//:modules/hooks'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import Can from '@//:modules/authorization/Can'
import { useQueryParam } from 'use-query-params'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar } from '@//:assets/icons'
import { useUpdateEffect } from 'usehooks-ts'
import SupportClubTransactionProcess from './SupportClubTransactionProcess/SupportClubTransactionProcess'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'

interface Props extends ButtonProps {
  clubQuery: SupportClubButtonClubFragment$key
  viewerQuery: SupportClubButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment SupportClubButtonClubFragment on Club {
    slug
    viewerMember {
      isSupporter
      clubSupporterSubscription {
        ...on IAccountClubSupporterSubscription {
          reference
        }
      }
    }
    canSupport
    viewerIsOwner
    supporterSubscriptionPrice {
      localizedPrice {
        amount
        currency
      }
    }
    ...SupportClubTransactionProcessFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportClubButtonViewerFragment on Account {
    ...SupportClubTransactionProcessViewerFragment
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
  const [tokenParam] = useQueryParam<string | null | undefined>('token')

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const price = displayPrice({
    amount: clubData.supporterSubscriptionPrice.localizedPrice.amount,
    currency: clubData.supporterSubscriptionPrice.localizedPrice.currency,
    locale: locale
  })

  const redirect = encodeJoinRedirect({
    pathname: '/[slug]',
    query: {
      slug: clubData.slug
    }
  })

  const buttonProps = {
    children: (
      <Trans>
        Become a Supporter {price}/mo
      </Trans>),
    colorScheme: 'orange',
    size: 'lg',
    w: '100%',
    leftIcon: (
      <Icon
        icon={PremiumStar}
        fill='orange.900'
        h={4}
        w={4}
      />)
  }

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
      setSupportParam(undefined)
    }
  }, [isOpen])

  if (viewerData == null) {
    if (!clubData.canSupport) {
      return (
        <></>
      )
    }

    return (
      <Stack spacing={1}>
        <LinkButton
          href={redirect}
          {...buttonProps}
          {...rest}
        />
        <Text fontSize='md' color='gray.00'>
          <Trans>
            Create an account and become a supporter to get access to this club's exclusive content!
          </Trans>
        </Text>
      </Stack>
    )
  }

  const SupporterOwnerButton = (): JSX.Element => {
    if (clubData.canSupport) {
      return (
        <Stack spacing={1}>
          <Box w='100%'>
            <Popover>
              <PopoverTrigger>
                <Button
                  {...buttonProps}
                  {...rest}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverCloseButton />
                <PopoverHeader fontWeight='semibold'>
                  <Trans>You are the owner</Trans>
                </PopoverHeader>
                <PopoverBody textAlign='left' fontSize='sm'>Because you are the owner of the club, you are a supporter
                  without an active subscription.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Text fontSize='md' color='gray.00'>
            <Trans>
              Support this club and get access to all of its exclusive content!
            </Trans>
          </Text>
        </Stack>
      )
    }

    return <></>
  }

  const SupporterPublicButton = (): JSX.Element => {
    if (clubData.viewerMember?.isSupporter === true) {
      return (
        <Stack spacing={1}>
          <LinkButton
            colorScheme='gray'
            size='lg'
            w='100%'
            {...rest}
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
            <Button
              isDisabled={allowed === false}
              onClick={onOpen}
              {...buttonProps}
              {...rest}
            />)}
        </Can>
        <Text fontSize='md' color='gray.00'>
          <Trans>
            Support this club and get access to all of its exclusive content!
          </Trans>
        </Text>
      </Stack>
    )
  }

  return (
    <HistoryDisclosureProvider {...methods}>
      {clubData.viewerIsOwner ? <SupporterOwnerButton /> : <SupporterPublicButton />}
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
            <SupportClubTransactionProcess clubQuery={clubData} viewerQuery={viewerData} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </HistoryDisclosureProvider>
  )
}