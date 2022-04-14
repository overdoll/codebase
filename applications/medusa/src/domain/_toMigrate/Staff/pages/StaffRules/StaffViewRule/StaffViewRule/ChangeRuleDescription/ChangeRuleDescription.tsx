import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeRuleDescriptionFragment$key } from '@//:artifacts/ChangeRuleDescriptionFragment.graphql'
import { Stack, Text } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeRuleDescriptionForm from './ChangeRuleDescriptionForm/ChangeRuleDescriptionForm'
import TranslationSnippet from '../../../../../../../../common/components/TranslationSnippet/TranslationSnippet'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeRuleDescriptionFragment$key
}

const Fragment = graphql`
  fragment ChangeRuleDescriptionFragment on Rule {
    description
    descriptionTranslations {
      ...TranslationSnippetFragment
    }
    ...ChangeRuleDescriptionFormFragment
  }
`

export default function ChangeRuleDescription ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Rule Description
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
              {data.descriptionTranslations.map((item, index) => (
                <TranslationSnippet key={index} query={item} />)
              )}
            </Stack>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Rule Description
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeRuleDescriptionForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
