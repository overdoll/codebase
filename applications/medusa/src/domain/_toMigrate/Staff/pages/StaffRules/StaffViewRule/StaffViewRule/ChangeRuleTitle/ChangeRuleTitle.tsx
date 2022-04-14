import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeRuleTitleFragment$key } from '@//:artifacts/ChangeRuleTitleFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeRuleTitleForm from './ChangeRuleTitleForm/ChangeRuleTitleForm'
import TagHeader from '../../../../../../../../common/components/TagHeader/TagHeader'
import TranslationSnippet from '../../../../../../../../common/components/TranslationSnippet/TranslationSnippet'
import { CollapseBody, CollapseButton, Collapse } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeRuleTitleFragment$key
}

const Fragment = graphql`
  fragment ChangeRuleTitleFragment on Rule {
    title
    titleTranslations {
      ...TranslationSnippetFragment
    }
    ...ChangeRuleTitleFormFragment
  }
`

export default function ChangeRuleTitle ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Rule Title
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
              Change Rule Title
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeRuleTitleForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
