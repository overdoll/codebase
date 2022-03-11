import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeCancellationReasonDeprecatedFragment$key } from '@//:artifacts/ChangeCancellationReasonDeprecatedFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../../components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeCancellationReasonDeprecatedForm from './ChangeCancellationReasonDeprecatedForm/ChangeCancellationReasonDeprecatedForm'

interface Props {
  query: ChangeCancellationReasonDeprecatedFragment$key
}

const Fragment = graphql`
  fragment ChangeCancellationReasonDeprecatedFragment on CancellationReason {
    deprecated
    ...ChangeCancellationReasonDeprecatedFormFragment
  }
`

export default function ChangeCancellationReasonDeprecated ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Cancellation Reason Deprecated
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <BooleanHeader isEnabled={data.deprecated} />
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Deprecated
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeCancellationReasonDeprecatedForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
