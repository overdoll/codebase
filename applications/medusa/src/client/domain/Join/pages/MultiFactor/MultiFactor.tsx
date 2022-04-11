import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorFragment$key } from '@//:artifacts/MultiFactorFragment.graphql'
import TotpSubmission from './TotpSubmission/TotpSubmission'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Collapse, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import RecoveryCode from './RecoveryCode/RecoveryCode'
import { Trans } from '@lingui/macro'
import Icon from '../../../../../modules/content/PageLayout/Flair/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons/interface'
import Head from 'next/head'

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
  }
`

export default function MultiFactor ({ queryRef }: Props): JSX.Element {
  const data = useFragment(MultiFactorFragmentGQL, queryRef)

  const {
    isOpen,
    onToggle
  } = useDisclosure()

  return (
    <>
      <Head>
        <title>Two-Factor Authentication :: overdoll</title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          {data.accountStatus?.multiFactor?.totp === true && <TotpSubmission queryRef={data} />}
          <Flex w='100%' justify='center'>
            <Button
              onClick={onToggle}
              size='lg'
              leftIcon={<Icon w={4} h={4} icon={WarningTriangle} fill='inherit' />}
            >
              <Trans>
                I lost access to my device
              </Trans>
            </Button>
          </Flex>
          <Collapse
            animateOpacity
            in={isOpen}
          >
            <RecoveryCode queryRef={data} />
          </Collapse>
        </Stack>
      </PageWrapper>
    </>
  )
}
