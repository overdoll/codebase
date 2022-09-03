import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeTopicDescriptionFragment$key } from '@//:artifacts/ChangeTopicDescriptionFragment.graphql'
import { Stack, Text } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeTopicDescriptionForm from './ChangeTopicDescriptionForm/ChangeTopicDescriptionForm'
import TranslationSnippet from '../../../../../../../../common/components/TranslationSnippet/TranslationSnippet'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeTopicDescriptionFragment$key
}

const Fragment = graphql`
  fragment ChangeTopicDescriptionFragment on Topic {
    description
    descriptionTranslations {
      text
      ...TranslationSnippetFragment
    }
    ...ChangeTopicDescriptionFormFragment
  }
`

export default function ChangeTopicDescription ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Topic Description
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <SmallBackgroundBox>
          <Text fontSize='sm' color='gray.00'>
            {data.description}
          </Text>
        </SmallBackgroundBox>
        <Collapse>
          <CollapseButton>
            <Trans>
              View Translations
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <Stack>
              {data.descriptionTranslations.map((item) => (
                <TranslationSnippet key={item.text} query={item} />)
              )}
            </Stack>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Topic Description
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeTopicDescriptionForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
