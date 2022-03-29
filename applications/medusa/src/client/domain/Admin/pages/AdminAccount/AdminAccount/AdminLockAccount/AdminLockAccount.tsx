import { graphql, useFragment } from 'react-relay/hooks'
import { AdminLockAccountFragment$key } from '@//:artifacts/AdminLockAccountFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import useCountdown from '@//:modules/hooks/useCountdown'
import AdminLockAccountForm from './AdminLockAccountForm/AdminLockAccountForm'
import AdminUnlockAccountForm from './AdminUnlockAccountForm/AdminUnlockAccountForm'

interface Props {
  query: AdminLockAccountFragment$key
}

const Fragment = graphql`
  fragment AdminLockAccountFragment on Account {
    lock {
      expires
    }
    ...AdminLockAccountFormFragment
    ...AdminUnlockAccountFormFragment
  }
`

export default function AdminLockAccount ({ query }: Props): JSX.Element {
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
              ? <AdminUnlockAccountForm query={data} />
              : <AdminLockAccountForm query={data} />}
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
