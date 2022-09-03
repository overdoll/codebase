import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeCancellationReasonTitleFragment$key } from '@//:artifacts/ChangeCancellationReasonTitleFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeCancellationReasonTitleForm from './ChangeCancellationReasonTitleForm/ChangeCancellationReasonTitleForm'
import TagHeader from '../../../../../../../../common/components/TagHeader/TagHeader'
import TranslationSnippet from '../../../../../../../../common/components/TranslationSnippet/TranslationSnippet'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeCancellationReasonTitleFragment$key
}

const Fragment = graphql`
  fragment ChangeCancellationReasonTitleFragment on CancellationReason {
    title
    titleTranslations {
      text
      ...TranslationSnippetFragment
    }
    ...ChangeCancellationReasonTitleFormFragment
  }
`

export default function ChangeCancellationReasonTitle ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Cancellation Reason Title
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
              Change Cancellation Reason Title
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeCancellationReasonTitleForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
