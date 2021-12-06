/**
 * @flow
 */
import type { Node } from 'react'
import type { Dispatch, State } from '@//:types/upload'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Text,
  CloseButton,
  Progress,
  Stack
} from '@chakra-ui/react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../constants/constants'
import { useTranslation } from 'react-i18next'
import { StringParam, useQueryParam } from 'use-query-params'
import type { Uppy } from '@uppy/core'
import type { FlowHeaderFragment$key } from '@//:artifacts/FlowHeaderFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import useCheckRequirements from './useCheckRequirements'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import progressScore from './progressScore'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: FlowHeaderFragment$key,
}

const FlowHeaderFragmentGQL = graphql`
  fragment FlowHeaderFragment on Query {
    post (reference: $reference) {
      id
      ...useCheckRequirementsFragment
    }
  }
`

export default function FlowHeader ({ state, uppy, dispatch, query }: Props): Node {
  const data = useFragment(FlowHeaderFragmentGQL, query)

  const [t] = useTranslation('manage')

  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const [content, audience, brand, categories, characters] = useCheckRequirements({ query: data.post })

  const score = progressScore([content, audience, brand, categories, characters])

  const onCleanup = () => {
    uppy.reset()
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
    setPostReference(undefined)
  }

  const findText = () => {
    switch (state.step) {
      case STEPS.ARRANGE:
        return [t('posts.flow.steps.arrange.header'), t('posts.flow.steps.arrange.subheader')]
      case STEPS.AUDIENCE:
        return [t('posts.flow.steps.audience.header'), t('posts.flow.steps.audience.subheader')]
      case STEPS.BRAND:
        return [t('posts.flow.steps.brand.header'), t('posts.flow.steps.brand.subheader')]
      case STEPS.CATEGORY:
        return [t('posts.flow.steps.category.header'), t('posts.flow.steps.category.subheader')]
      case STEPS.CHARACTER:
        return [t('posts.flow.steps.character.header'), t('posts.flow.steps.character.subheader')]
      case STEPS.REVIEW:
        return [t('posts.flow.steps.review.header'), t('posts.flow.steps.review.subheader')]
      case STEPS.SUBMIT:
        return [t('posts.flow.steps.submit.header'), t('posts.flow.steps.submit.subheader')]
      default:
        return ['', '']
    }
  }

  return (
    <Box>
      <Flex align='center' justify='space-between' mb={2}>
        <Flex direction='column'>
          <Heading color='gray.00' fontSize='2xl'>
            {findText()[0]}
          </Heading>
          <Text color='gray.100' fontSize='md'>
            {findText()[1]}
          </Text>
        </Flex>
        <CloseButton size='lg' onClick={onCleanup} />
      </Flex>
      <Progress size='sm' colorScheme={score >= 100 ? 'green' : 'primary'} value={score} />
    </Box>
  )
}
