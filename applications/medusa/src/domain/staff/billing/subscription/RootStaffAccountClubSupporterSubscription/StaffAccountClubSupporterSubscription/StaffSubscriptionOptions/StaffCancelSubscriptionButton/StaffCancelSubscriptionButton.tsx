import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type {
  StaffCancelSubscriptionButtonFragment$key
} from '@//:artifacts/StaffCancelSubscriptionButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { StaffCancelSubscriptionButtonMutation } from '@//:artifacts/StaffCancelSubscriptionButtonMutation.graphql'
import { useHistoryDisclosure } from '@//:modules/hooks'
import useSearch from '@//:modules/content/HookedComponents/Search/hooks/useSearch'
import { useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import SelectCancellationReasonList
  from '../../../../../../../settings/billing/subscription/RootAccountClubSupporterSubscriptionSettings/AccountClubSupporterSubscriptionSettings/AccountActiveClubSupporterSubscriptionSettings/ManageActiveSubscriptionButton/CancelSubscriptionButton/SelectCancellationReasonList/SelectCancellationReasonList'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { DeleteCircle } from '@//:assets/icons'

interface Props {
  query: StaffCancelSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment StaffCancelSubscriptionButtonFragment on AccountActiveClubSupporterSubscription {
    id
  }
`

const Mutation = graphql`
  mutation StaffCancelSubscriptionButtonMutation($input: CancelAccountClubSupporterSubscriptionInput!) {
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
          }
        }
      }
    }
  }
`

export default function StaffCancelSubscriptionButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffCancelSubscriptionButtonMutation>(Mutation)

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
      onCompleted () {
        notify({
          status: 'success',
          title: t`Subscription cancelled.`
        })
        onClose()
        clearValues()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error cancelling the subscription.`
        })
      }
    })
  }

  return (
    <>
      <MenuItem
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
            <Text fontSize='md' color='gray.00'>
              <Trans>
                Select cancellation reason
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
