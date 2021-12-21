import { useEffect } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { BrandFragment$key } from '@//:artifacts/BrandFragment.graphql'
import { useTranslation } from 'react-i18next'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useSingleSelector } from '../../../../../../../../../components/ContentSelection'
import { Flex } from '@chakra-ui/react'
import RequiredPrompt from '../../../../../components/RequiredPrompt/RequiredPrompt'
import { EVENTS } from '../../../../../constants/constants'
import RootBrands from './RootBrands/RootBrands'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: BrandFragment$key
}

const BrandFragmentGQL = graphql`
  fragment BrandFragment on Post {
    brand {
      id
    }
  }
`

export default function Brand ({
  uppy,
  state,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(BrandFragmentGQL, query)

  const [t] = useTranslation('manage')

  const determineDefaultBrand = (): string => {
    if (data?.brand?.id == null) {
      return ''
    }
    return data.brand.id
  }

  const [currentSelection, setCurrentSelection] = useSingleSelector({ initialSelection: determineDefaultBrand() })

  useEffect(() => {
    dispatch({
      type: EVENTS.BRAND,
      value: currentSelection
    })
  }, [currentSelection])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          {t('create_post.flow.steps.brand.selector.title')}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('create_post.flow.steps.brand.selector.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <RootBrands selected={currentSelection} onSelect={setCurrentSelection} />
      <Flex justify='center'>
        <RequiredPrompt>{t('create_post.flow.steps.brand.required_prompt')}</RequiredPrompt>
      </Flex>
    </>
  )
}
