import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeAudienceTitleFragment$key } from '@//:artifacts/ChangeAudienceTitleFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeAudienceTitleForm from './ChangeAudienceTitleForm/ChangeAudienceTitleForm'
import TagHeader from '../../../../../../../../common/components/TagHeader/TagHeader'
import TranslationSnippet from '../../../../../../../../common/components/TranslationSnippet/TranslationSnippet'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeAudienceTitleFragment$key
}

const Fragment = graphql`
  fragment ChangeAudienceTitleFragment on Audience {
    title
    titleTranslations {
      text
      ...TranslationSnippetFragment
    }
    ...ChangeAudienceTitleFormFragment
  }
`

export default function ChangeAudienceTitle ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Audience Title
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
              Change Audience Title
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeAudienceTitleForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
