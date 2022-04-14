import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeRuleInfractionFragment$key } from '@//:artifacts/ChangeRuleInfractionFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../../../../../common/components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import ChangeRuleInfractionForm from './ChangeRuleInfractionForm/ChangeRuleInfractionForm'

interface Props {
  query: ChangeRuleInfractionFragment$key
}

const Fragment = graphql`
  fragment ChangeRuleInfractionFragment on Rule {
    infraction
    ...ChangeRuleInfractionFormFragment
  }
`

export default function ChangeRuleInfraction ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Rule Infraction
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <BooleanHeader isEnabled={data.infraction} />
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Infraction
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeRuleInfractionForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
