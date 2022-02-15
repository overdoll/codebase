import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeSeriesTitleFragment$key } from '@//:artifacts/ChangeSeriesTitleFragment.graphql'
import { Collapse, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeSeriesTitleForm from './ChangeSeriesTitleForm/ChangeSeriesTitleForm'
import TagHeader from '../../../../../components/TagHeader/TagHeader'
import TranslationSnippet from '../../../../../components/TranslationSnippet/TranslationSnippet'
import { CollapseBody, CollapseButton } from '../../../../../../../components/Collapse/Collapse'

interface Props {
  query: ChangeSeriesTitleFragment$key
}

const Fragment = graphql`
  fragment ChangeSeriesTitleFragment on Series {
    title
    titleTranslations {
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
                <TranslationSnippet key={index} query={item} />)
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
