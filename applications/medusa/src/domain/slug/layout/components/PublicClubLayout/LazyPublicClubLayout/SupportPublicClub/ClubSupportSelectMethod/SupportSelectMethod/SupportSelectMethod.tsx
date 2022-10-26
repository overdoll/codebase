import type { SupportSelectMethodFragment$key } from '@//:artifacts/SupportSelectMethodFragment.graphql'
import type { SupportSelectMethodViewerFragment$key } from '@//:artifacts/SupportSelectMethodViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { FlowBuilder, FlowBuilderBody } from '@//:modules/content/PageLayout'
import { ClubPeopleGroup } from '@//:assets/icons'
import SelectMethodChoice from './SelectMethodChoice/SelectMethodChoice'
import NewPaymentMethod from './NewPaymentMethod/NewPaymentMethod'
import SavedPaymentMethod from './SavedPaymentMethod/SavedPaymentMethod'
import { SequenceProvider, useSequence, ValueResolver } from '@//:modules/content/HookedComponents/Sequence'
import { ForwardedRef } from 'react'
import { Stack } from '@chakra-ui/react'
import HeaderPaymentMethod from './HeaderPaymentMethod/HeaderPaymentMethod'

interface Props {
  clubQuery: SupportSelectMethodFragment$key
  viewerQuery: SupportSelectMethodViewerFragment$key
  closeButtonRef: ForwardedRef<any>
}

interface SequenceProps {
  currency: string
  savePayment: boolean
  guidelines: boolean
}

const ClubFragment = graphql`
  fragment SupportSelectMethodFragment on Club {
    supporterSubscriptionPrice {
      localizedPrice {
        currency
      }
    }
    ...NewPaymentMethodFragment
    ...SavedPaymentMethodFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportSelectMethodViewerFragment on Account {
    savedPaymentMethods {
      edges {
        node {
          __typename
        }
      }
    }
    ...SelectMethodChoiceViewerFragment
    ...SavedPaymentMethodViewerFragment
    ...HeaderPaymentMethodFragment
  }
`

export default function SupportSelectMethod (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery,
    closeButtonRef
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const methods = useSequence<SequenceProps>({
    defaultValue: {
      currency: clubData.supporterSubscriptionPrice.localizedPrice.currency,
      savePayment: false,
      guidelines: false
    },
    resolver: {
      currency: ValueResolver(),
      savePayment: ValueResolver(),
      guidelines: ValueResolver()
    }
  })

  const steps = ['select_payment', 'new_payment', 'existing_payment']
  const components = {
    select_payment: (
      <SelectMethodChoice
        viewerQuery={viewerData}
      />),
    new_payment: (
      <NewPaymentMethod
        clubQuery={clubData}
      />),
    existing_payment: (
      <SavedPaymentMethod
        clubQuery={clubData}
        viewerQuery={viewerData}
      />)
  }
  const headers = {
    select_payment: {
      title: 'Make a choice',
      icon: ClubPeopleGroup
    },
    new_payment: {
      title: 'Enter new payment information',
      icon: ClubPeopleGroup
    },
    existing_payment: {
      title: 'Use existing payment method',
      icon: ClubPeopleGroup
    }
  }

  return (
    <SequenceProvider {...methods}>
      <FlowBuilder
        stepsArray={steps}
        stepsComponents={components}
        stepsHeaders={headers}
        defaultStep={viewerData.savedPaymentMethods != null && viewerData.savedPaymentMethods.edges.length > 0 ? 'select_payment' : 'new_payment'}
      >
        <Stack spacing={2}>
          <HeaderPaymentMethod query={viewerData} closeButtonRef={closeButtonRef} />
          <FlowBuilderBody minH={undefined} />
        </Stack>
      </FlowBuilder>
    </SequenceProvider>
  )
}
