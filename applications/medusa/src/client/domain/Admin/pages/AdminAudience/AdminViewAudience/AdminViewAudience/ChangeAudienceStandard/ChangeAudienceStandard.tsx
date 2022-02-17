import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeAudienceStandardFragment$key } from '@//:artifacts/ChangeAudienceStandardFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import BooleanHeader from '../../../../../components/BooleanHeader/BooleanHeader'
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../../components/Collapse/Collapse'
import ChangeAudienceStandardForm from './ChangeAudienceStandardForm/ChangeAudienceStandardForm'

interface Props {
  query: ChangeAudienceStandardFragment$key
}

const Fragment = graphql`
  fragment ChangeAudienceStandardFragment on Audience {
    standard
    ...ChangeAudienceStandardFormFragment
  }
`

export default function ChangeAudienceStandard ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Audience Standard
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <BooleanHeader isEnabled={data.standard} />
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Standard
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeAudienceStandardForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
