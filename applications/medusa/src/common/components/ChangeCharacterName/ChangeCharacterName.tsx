import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeCharacterNameFragment$key } from '@//:artifacts/ChangeCharacterNameFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ChangeCharacterNameForm from './ChangeCharacterNameForm/ChangeCharacterNameForm'
import TagHeader from '../TagHeader/TagHeader'
import TranslationSnippet from '../TranslationSnippet/TranslationSnippet'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: ChangeCharacterNameFragment$key
}

const Fragment = graphql`
  fragment ChangeCharacterNameFragment on Character {
    name
    nameTranslations {
      ...TranslationSnippetFragment
    }
    ...ChangeCharacterNameFormFragment
  }
`

export default function ChangeCharacterName ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Character Name
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <TagHeader>
          {data.name}
        </TagHeader>
        <Collapse>
          <CollapseButton>
            <Trans>
              View Translations
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <Stack>
              {data.nameTranslations.map((item, index) => (
                <TranslationSnippet key={index} query={item} />)
              )}
            </Stack>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Character Name
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <ChangeCharacterNameForm query={data} />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
