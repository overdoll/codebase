import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorFragment$key } from '@//:artifacts/MultiFactorFragment.graphql'
import TotpSubmission from './TotpSubmission/TotpSubmission'
import { Flex, HStack, Stack } from '@chakra-ui/react'
import RecoveryCode from './RecoveryCode/RecoveryCode'
import Head from 'next/head'
import RevokeTokenButton from '../../components/RevokeTokenButton/RevokeTokenButton'
import {
  FlowBuilder,
  FlowBuilderBody,
  FlowBuilderFooter,
  FlowBuilderPreviousButton
} from '@//:modules/content/PageLayout'

interface Props {
  queryRef: MultiFactorFragment$key
}

const MultiFactorFragmentGQL = graphql`
  fragment MultiFactorFragment on AuthenticationToken {
    accountStatus {
      multiFactor {
        totp
      }
    }
    ...TotpSubmissionFragment
    ...RecoveryCodeFragment
    ...RevokeTokenButtonFragment
  }
`

export default function MultiFactor ({ queryRef }: Props): JSX.Element {
  const data = useFragment(MultiFactorFragmentGQL, queryRef)

  const steps = ['multi-factor', 'recovery-codes']

  const components = {
    'multi-factor': (
      <Stack spacing={6}>{data.accountStatus?.multiFactor?.totp === true &&
        <TotpSubmission queryRef={data} />}
      </Stack>),
    'recovery-codes': (
      <Stack spacing={6}>
        <RecoveryCode queryRef={data} />
      </Stack>)
  }

  return (
    <>
      <Head>
        <title>Two-Factor Authentication :: overdoll</title>
      </Head>
      <Flex align='center' justify='center' h='100%' position='relative'>
        <FlowBuilder
          colorScheme='green'
          stepsArray={steps}
          stepsComponents={components}
        >
          <HStack top={0} right={0} position='absolute' w='100%' justify='space-between'>
            <FlowBuilderFooter>
              {({ currentStep }) => currentStep === 'recovery-codes' && <FlowBuilderPreviousButton />}
            </FlowBuilderFooter>
            <RevokeTokenButton queryRef={data} />
          </HStack>
          <FlowBuilderBody />
        </FlowBuilder>
      </Flex>
    </>
  )
}
