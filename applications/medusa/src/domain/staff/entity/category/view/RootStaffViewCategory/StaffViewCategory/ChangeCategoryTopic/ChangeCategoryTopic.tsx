import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeCategoryTopicFragment$key } from '@//:artifacts/ChangeCategoryTopicFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeCategoryTopicForm from './ChangeCategoryTopicForm/ChangeCategoryTopicForm'
import TagHeader from '../../../../../../../../common/components/TagHeader/TagHeader'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import TagBadgeHeader from '../../../../../../../../common/components/TagBadgeHeader/TagBadgeHeader'

interface Props {
  query: ChangeCategoryTopicFragment$key
}

const Fragment = graphql`
  fragment ChangeCategoryTopicFragment on Category {
    topic {
      title
    }
    ...ChangeCategoryTopicFormFragment
  }
`

export default function ChangeCategoryTopic ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Category Topic
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        {data.topic == null
          ? (
            <TagHeader>
              <Trans>No topic</Trans>
            </TagHeader>
            )
          : (
            <TagBadgeHeader>
              {data.topic.title}
            </TagBadgeHeader>
            )}
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Category Topic
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeCategoryTopicForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
