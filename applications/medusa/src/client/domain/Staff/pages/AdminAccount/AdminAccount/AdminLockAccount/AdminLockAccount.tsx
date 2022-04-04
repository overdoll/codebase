import { graphql, useFragment } from 'react-relay/hooks'
import { StaffLockAccountFragment$key } from '@//:artifacts/StaffLockAccountFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import useCountdown from '@//:modules/hooks/useCountdown'
import StaffLockAccountForm from './StaffLockAccountForm/StaffLockAccountForm'
import StaffUnlockAccountForm from './StaffUnlockAccountForm/StaffUnlockAccountForm'

interface Props {
  query: StaffLockAccountFragment$key
}

const Fragment = graphql`
  fragment StaffLockAccountFragment on Account {
    lock {
      expires
    }
    ...StaffLockAccountFormFragment
    ...StaffUnlockAccountFormFragment
  }
`

export default function StaffLockAccount ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const isLocked = data.lock != null

  const {
    hasPassed,
    remaining
  } = useCountdown(data?.lock?.expires)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Locked
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <BooleanHeader isEnabled={isLocked} />
        {!hasPassed && (
          <SmallBackgroundBox>
            {remaining}
          </SmallBackgroundBox>)}
        <Collapse>
          <CollapseButton>
            {isLocked
              ? (
                <Trans>
                  Unlock Account
                </Trans>)
              : (
                <Trans>
                  Lock Account
                </Trans>)}
          </CollapseButton>
          <CollapseBody>
            {isLocked
              ? <StaffUnlockAccountForm query={data} />
              : <StaffLockAccountForm query={data} />}
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
