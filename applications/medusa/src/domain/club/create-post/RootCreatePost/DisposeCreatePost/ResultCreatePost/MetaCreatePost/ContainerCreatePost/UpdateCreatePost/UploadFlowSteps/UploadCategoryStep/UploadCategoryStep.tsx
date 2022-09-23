import {
  MobileContainer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadCategoryStepFragment$key } from '@//:artifacts/UploadCategoryStepFragment.graphql'
import UploadSearchCategories from './UploadSearchCategories/UploadSearchCategories'
import UploadRewindCategories from './UploadRewindCategories/UploadRewindCategories'
import UploadSelectTopics from './UploadSelectTopics/UploadSelectTopics'
import Head from 'next/head'

interface Props {
  query: UploadCategoryStepFragment$key
}

export interface UploadSearchCategoriesMultiSelectorProps {
  title: string
}

const Fragment = graphql`
  fragment UploadCategoryStepFragment on Post {
    ...UploadRewindCategoriesFragment
  }
`

export default function UploadCategoryStep ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    dispatch,
    state
  } = useSequenceContext()

  const {
    values,
    register,
    removeValue,
    onChange
  } = useChoice<UploadSearchCategoriesMultiSelectorProps>({
    defaultValue: state.categories,
    onChange: (props) => dispatch({
      type: 'categories',
      value: props,
      transform: 'SET'
    })
  })

  return (
    <MobileContainer>
      <Head>
        <title>
          Select Categories - overdoll
        </title>
      </Head>
      <Stack spacing={2}>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Add some categories
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Select a topic to see the available categories you can add, or search for a category by name.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <ChoiceRemovableTags
          titleKey='title'
          values={values}
          removeValue={removeValue}
        />
        <Stack spacing={4}>
          <UploadSearchCategories
            rightSearchComponent={<UploadRewindCategories onChange={onChange} currentValues={values} query={data} />}
            register={register}
          />
          <UploadSelectTopics register={register} />
        </Stack>
      </Stack>
    </MobileContainer>
  )
}
