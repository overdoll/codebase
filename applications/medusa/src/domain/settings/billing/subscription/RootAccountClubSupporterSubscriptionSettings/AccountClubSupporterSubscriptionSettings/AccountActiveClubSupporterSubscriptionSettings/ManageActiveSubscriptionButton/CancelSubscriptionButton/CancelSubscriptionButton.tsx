import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { CancelSubscriptionButtonFragment$key } from '@//:artifacts/CancelSubscriptionButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { CancelSubscriptionButtonMutation } from '@//:artifacts/CancelSubscriptionButtonMutation.graphql'
import { useHistoryDisclosure } from '@//:modules/hooks'
import useSearch from '@//:modules/content/HookedComponents/Search/hooks/useSearch'
import { useChoice } from '@//:modules/content/HookedComponents/Choice'
import { Alert, AlertDescription, AlertIcon, useToast } from '@//:modules/content/ThemeComponents'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import SelectCancellationReasonList from './SelectCancellationReasonList/SelectCancellationReasonList'
import LargeClubHeader from '../../../../../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import format from 'date-fns/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { DeleteCircle } from '@//:assets/icons'
import { dateFormat } from '@//:modules/constants/format'
import { ConnectionProp } from '@//:types/components'

interface Props extends ConnectionProp {
  query: CancelSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment CancelSubscriptionButtonFragment on AccountActiveClubSupporterSubscription {
    id
    club {
      ...LargeClubHeaderFragment
    }
    nextBillingDate
  }
`

const Mutation = graphql`
  mutation CancelSubscriptionButtonMutation($input: CancelAccountClubSupporterSubscriptionInput!) {
    cancelAccountClubSupporterSubscription(input: $input) {
      clubSupporterSubscription {
        __typename
        ... on IAccountClubSupporterSubscription {
          id
        }
        ... on AccountCancelledClubSupporterSubscription {
          id
          reference
          supporterSince
          cancelledAt
          endDate
          club {
            name
            slug
            thumbnail {
              ...ResourceIconFragment
            }
          }
          ...ManageCancelledSubscriptionButtonFragment
        }
      }
    }
  }
`

export default function CancelSubscriptionButton ({
  query,
  connectionId
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<CancelSubscriptionButtonMutation>(Mutation)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const nextBillingDate = format(new Date(data.nextBillingDate as Date), dateFormat, { locale })

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const {
    loadQuery,
    searchArguments
  } = useSearch<{}>({})

  const {
    values,
    register,
    clearValues
  } = useChoice<{}>({
    max: 1
  })

  const isDisabled = Object.keys(values).length < 1

  const notify = useToast()

  const onSubmit = (): void => {
    const cancellationReasonId = Object.keys(values)[0]

    commit({
      variables: {
        input: {
          clubSupporterSubscriptionId: data.id,
          cancellationReasonId: cancellationReasonId
        }
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t`Subscription was cancelled. You will no longer be billed when it expires.`
        })
        onClose()
        clearValues()
      },
      updater: (store, payloadData) => {
        const naturalPayload = payloadData?.cancelAccountClubSupporterSubscription?.clubSupporterSubscription
        const subscription = store.get(data.id)
        if (subscription != null && naturalPayload != null) {
          subscription.setValue(naturalPayload.__typename, '__typename')
          subscription.setValue(naturalPayload.cancelledAt, 'cancelledAt')
          subscription.setValue(naturalPayload.endDate, 'endDate')
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error cancelling your subscription.`
        })
      }
    })
  }

  return (
    <>
      <MenuItem
        colorScheme='orange'
        onClick={onOpen}
        icon={DeleteCircle}
        text={(
          <Trans>
            Cancel Subscription
          </Trans>)}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='none'
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Cancel Subscription
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <Stack spacing={2}>
              <Alert
                status='info'
              >
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    After cancelling your subscription, you will no longer be billed. You will keep your benefits
                    until {nextBillingDate}. After this date, they will expire.
                  </Trans>
                </AlertDescription>
              </Alert>
              <LargeClubHeader query={data.club} />
              <Text fontSize='md' color='gray.00'>
                <Trans>
                  Please tell us why you would like to cancel the subscription. We'll communicate this to the club so
                  they can continue to improve their content.
                </Trans>
              </Text>
              <QueryErrorBoundary loadQuery={loadQuery}>
                <Suspense fallback={<SkeletonStack />}>
                  <SelectCancellationReasonList
                    searchArguments={searchArguments}
                    register={register}
                  />
                </Suspense>
              </QueryErrorBoundary>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onSubmit}
              size='lg'
              w='100%'
              colorScheme='orange'
              isDisabled={isDisabled}
              isLoading={isInFlight}
            >
              <Trans>
                Cancel Subscription
              </Trans>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
