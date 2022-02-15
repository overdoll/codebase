import { graphql, useFragment } from 'react-relay/hooks'
import { ChangeCategoryTitleFragment$key } from '@//:artifacts/ChangeCategoryTitleFragment.graphql'
import { Collapse, Stack, useDisclosure } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import ChangeCategoryTitleForm from './ChangeCategoryTitleForm/ChangeCategoryTitleForm'
import TagHeader from '../../../../../components/TagHeader/TagHeader'
import TranslationSnippet from '../../../../../components/TranslationSnippet/TranslationSnippet'

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

  const {
    onToggle: onToggleTranslations,
    isOpen: isOpenTranslations
  } = useDisclosure()

  const {
    onToggle: OnToggleForm,
    isOpen: isOpenForm
  } = useDisclosure()

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
        <Button
          variant='solid'
          colorScheme='gray'
          onClick={onToggleTranslations}
          size='sm'
        >
          <Trans>
            View Translations
          </Trans>
        </Button>
        <Collapse in={isOpenTranslations} animateOpacity>
          <Stack>
            {data.titleTranslations.map((item, index) => (
              <TranslationSnippet key={index} query={item} />)
            )}
          </Stack>
        </Collapse>
        <Button
          variant='solid'
          colorScheme='gray'
          onClick={OnToggleForm}
          size='sm'
        >
          <Trans>
            Change Category Title
          </Trans>
        </Button>
        <Collapse in={isOpenForm} animateOpacity>
          <ChangeCategoryTitleForm query={data} />
        </Collapse>
      </Stack>
    </>
  )
}
