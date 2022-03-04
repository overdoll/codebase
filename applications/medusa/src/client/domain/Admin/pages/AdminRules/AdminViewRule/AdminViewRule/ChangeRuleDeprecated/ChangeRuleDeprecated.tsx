import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeRuleDeprecatedFragment$key } from '@//:artifacts/ChangeRuleDeprecatedFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../../components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeRuleDeprecatedForm from './ChangeRuleDeprecatedForm/ChangeRuleDeprecatedForm'

interface Props {
  query: ChangeRuleDeprecatedFragment$key
}

const Fragment = graphql`
  fragment ChangeRuleDeprecatedFragment on Rule {
    deprecated
    ...ChangeRuleDeprecatedFormFragment
  }
`

export default function ChangeRuleDeprecated ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Rule Deprecated
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
            <ChangeRuleDeprecatedForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
