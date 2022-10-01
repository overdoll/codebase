import { graphql, useFragment } from 'react-relay/hooks'
import type {
  MultiFactorAuthenticationTokenFragment$key
} from '@//:artifacts/MultiFactorAuthenticationTokenFragment.graphql'
import { Flex, HStack, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import {
  FlowBuilder,
  FlowBuilderBody,
  FlowBuilderFooter,
  FlowBuilderPreviousButton
} from '@//:modules/content/PageLayout'
import { WarningTriangle } from '@//:assets/icons'
import RevokeViewAuthenticationTokenButton
  from '../../RevokeViewAuthenticationTokenButton/RevokeViewAuthenticationTokenButton'
import TotpAuthenticationToken from './TotpAuthenticationToken/TotpAuthenticationToken'
import RecoveryCodeAuthenticationToken from './RecoveryCodeAuthenticationToken/RecoveryCodeAuthenticationToken'

interface Props {
  query: MultiFactorAuthenticationTokenFragment$key
}

const MultiFactorFragmentGQL = graphql`
  fragment MultiFactorAuthenticationTokenFragment on AuthenticationToken {
    ...TotpAuthenticationTokenFragment
    ...RecoveryCodeAuthenticationTokenFragment
    ...RevokeViewAuthenticationTokenButtonFragment
  }
`

export default function MultiFactorAuthenticationToken (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(MultiFactorFragmentGQL, query)

  const steps = ['multi-factor', 'recovery-codes']

  const components = {
    'multi-factor': (
      <Stack spacing={6}>
        <TotpAuthenticationToken query={data} />
      </Stack>),
    'recovery-codes': (
      <Stack spacing={6}>
        <RecoveryCodeAuthenticationToken query={data} />
      </Stack>)
  }

  const headers = {
    'multi-factor': {
      title: '1',
      icon: WarningTriangle
    },
    'recovery-codes': {
      title: '2',
      icon: WarningTriangle
    }
  }

  return (
    <>
      <Head>
        <title>Two-Factor Authentication - overdoll</title>
      </Head>
      <Flex align='center' justify='center' h='100%' position='relative'>
        <FlowBuilder
          stepsHeaders={headers}
          colorScheme='green'
          stepsArray={steps}
          stepsComponents={components}
        >
          <HStack top={0} right={0} position='absolute' w='100%' justify='space-between'>
            <FlowBuilderFooter>
              {({ currentStep }) => currentStep === 'recovery-codes' && <FlowBuilderPreviousButton />}
            </FlowBuilderFooter>
            <RevokeViewAuthenticationTokenButton query={data} />
          </HStack>
          <FlowBuilderBody />
        </FlowBuilder>
      </Flex>
    </>
  )
}
