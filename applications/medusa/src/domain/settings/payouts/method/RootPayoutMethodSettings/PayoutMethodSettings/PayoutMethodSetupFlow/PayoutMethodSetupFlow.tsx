import { graphql, useFragment } from 'react-relay/hooks'
import type { PayoutMethodSetupFlowFragment$key } from '@//:artifacts/PayoutMethodSetupFlowFragment.graphql'
import { Stack } from '@chakra-ui/react'
import {
  FlowBuilder,
  FlowBuilderBody,
  FlowBuilderFooter,
  FlowBuilderHeader,
  FlowBuilderProgress
} from '@//:modules/content/PageLayout'
import { PayoutMethod, SearchBar } from '@//:assets/icons'
import { ChoiceProvider, useChoice } from '@//:modules/content/HookedComponents/Choice'
import ChoosePayoutMethod from './ChoosePayoutMethod/ChoosePayoutMethod'
import SetupPayoutMethod from './SetupPayoutMethod/SetupPayoutMethod'

interface Props {
  query: PayoutMethodSetupFlowFragment$key
}

const Fragment = graphql`
  fragment PayoutMethodSetupFlowFragment on Country {
    ...ChoosePayoutMethodFragment
  }
`

export default function PayoutMethodSetupFlow ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const methods = useChoice<{}>({})

  const steps = ['method', 'setup']

  const components = {
    method: <ChoosePayoutMethod query={data} />,
    setup: <SetupPayoutMethod />
  }

  const headers = {
    method: {
      title: 'Select Payout Method',
      icon: PayoutMethod
    },
    setup: {
      title: 'Setup Payout Method',
      icon: SearchBar
    }
  }

  return (
    <FlowBuilder
      colorScheme='green'
      stepsArray={steps}
      stepsComponents={components}
      stepsHeaders={headers}
    >
      <Stack
        borderRadius='md'
        spacing={3}
        p={4}
        bg='gray.800'
      >
        <FlowBuilderHeader />
        <FlowBuilderProgress />
      </Stack>
      <ChoiceProvider {...methods}>
        <FlowBuilderBody />
      </ChoiceProvider>
      <FlowBuilderFooter isDisabled={Object.keys(methods.values).length < 1} />
    </FlowBuilder>
  )
}
