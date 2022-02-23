import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeCategoryTitleFragment$key } from '@//:artifacts/ChangeCategoryTitleFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeCategoryTitleForm from './ChangeCategoryTitleForm/ChangeCategoryTitleForm'
import TagHeader from '../../../../../components/TagHeader/TagHeader'
import TranslationSnippet from '../../../../../components/TranslationSnippet/TranslationSnippet'
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../../../modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeCategoryTitleFragment$key
}

const Fragment = graphql`
  fragment ChangeCategoryTitleFragment on Category {
    title
    titleTranslations {
      ...TranslationSnippetFragment
    }
    ...ChangeCategoryTitleFormFragment
  }
`

export default function ChangeCategoryTitle ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Category Title
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
              Change Category Title
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeCategoryTitleForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
