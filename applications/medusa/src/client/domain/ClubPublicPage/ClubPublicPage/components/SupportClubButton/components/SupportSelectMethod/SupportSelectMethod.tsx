import type { SupportSelectMethodFragment$key } from '@//:artifacts/SupportSelectMethodFragment.graphql'
import type { SupportSelectMethodViewerFragment$key } from '@//:artifacts/SupportSelectMethodViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { FlowBuilder, FlowBuilderBody } from '@//:modules/content/PageLayout'
import { ClubPeopleGroup } from '@//:assets/icons'
import SelectMethodChoice from './SelectMethodChoice/SelectMethodChoice'
import NewPaymentMethod from './NewPaymentMethod/NewPaymentMethod'

interface Props {
  clubQuery: SupportSelectMethodFragment$key
  viewerQuery: SupportSelectMethodViewerFragment$key
}

const ClubFragment = graphql`
  fragment SupportSelectMethodFragment on Club {
    ...NewPaymentMethodFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportSelectMethodViewerFragment on Account {
    __typename
    savedPaymentMethods {
      edges {
        node {
          __typename
        }
      }
    }
    ...NewPaymentMethodViewerFragment
    ...SelectMethodChoiceViewerFragment
  }
`

export default function SupportSelectMethod ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const steps = ['select_payment', 'new_payment', 'existing_payment']
  const components = {
    select_payment: <SelectMethodChoice viewerQuery={viewerData} />,
    new_payment: <NewPaymentMethod clubQuery={clubData} viewerQuery={viewerData} />,
    existing_payment: <></>
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
    <FlowBuilder
      stepsArray={steps}
      stepsComponents={components}
      stepsHeaders={headers}
      defaultStep={viewerData.savedPaymentMethods != null && viewerData.savedPaymentMethods.edges.length > 0 ? 'select_payment' : 'new_payment'}
    >
      <FlowBuilderBody />
    </FlowBuilder>
  )
}
