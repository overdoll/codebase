import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeTopicTitleFragment$key } from '@//:artifacts/ChangeTopicTitleFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeTopicTitleForm from './ChangeTopicTitleForm/ChangeTopicTitleForm'
import TagHeader from '../../../../../../../../common/components/TagHeader/TagHeader'
import TranslationSnippet from '../../../../../../../../common/components/TranslationSnippet/TranslationSnippet'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeTopicTitleFragment$key
}

const Fragment = graphql`
  fragment ChangeTopicTitleFragment on Topic {
    title
    titleTranslations {
      ...TranslationSnippetFragment
    }
    ...ChangeTopicTitleFormFragment
  }
`

export default function ChangeTopicTitle ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Topic Title
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <TagHeader>
          {data.title}
        </TagHeader>
        <Collapse>
          <CollapseButton>
            <Trans>
              View Translations
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <Stack>
              {data.titleTranslations.map((item, index) => (
                <TranslationSnippet key={index} query={item} />)
              )}
            </Stack>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Topic Title
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeTopicTitleForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
