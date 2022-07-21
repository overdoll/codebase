import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeTopicWeightFragment$key } from '@//:artifacts/ChangeTopicWeightFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeTopicWeightForm from './ChangeTopicWeightForm/ChangeTopicWeightForm'
import TagHeader from '../../../../../../../../common/components/TagHeader/TagHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeTopicWeightFragment$key
}

const Fragment = graphql`
  fragment ChangeTopicWeightFragment on Topic {
    weight
    ...ChangeTopicWeightFormFragment
  }
`

export default function ChangeTopicWeight ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Topic Weight
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <TagHeader>
          {`${data.weight}`}
        </TagHeader>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Topic Weight
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeTopicWeightForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
