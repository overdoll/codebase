import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeSeriesTitleFragment$key } from '@//:artifacts/ChangeSeriesTitleFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeSeriesTitleForm from './ChangeSeriesTitleForm/ChangeSeriesTitleForm'
import TagHeader from '../../../../../../../../common/components/TagHeader/TagHeader'
import TranslationSnippet from '../../../../../../../../common/components/TranslationSnippet/TranslationSnippet'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeSeriesTitleFragment$key
}

const Fragment = graphql`
  fragment ChangeSeriesTitleFragment on Series {
    title
    titleTranslations {
      text
      ...TranslationSnippetFragment
    }
    ...ChangeSeriesTitleFormFragment
  }
`

export default function ChangeSeriesTitle ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Series Title
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
                <TranslationSnippet key={item.text} query={item} />)
              )}
            </Stack>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Series Title
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeSeriesTitleForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
