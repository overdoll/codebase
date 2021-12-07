/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../../constants/constants'
import Button from '@//:modules/form/Button'
import { Stack, Flex, Heading, Text, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch
}

export default function Submit ({ uppy, state, dispatch }: Props): Node {
  const [t] = useTranslation('manage')

  if (state.isInReview) {
    return (
      <LargeBackgroundBox>
        <Flex h={400} justify='center' direction='column' align='center'>
          <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
            {t('create_post.flow.steps.submit.in_review.title')}
          </Heading>
          <Text textAlign='center' color='gray.100' fontSize='md'>
            {t('create_post.flow.steps.submit.in_review.description')}
          </Text>
        </Flex>
      </LargeBackgroundBox>
    )
  }

  return (
    <LargeBackgroundBox>
      <Flex h={400} justify='center' direction='column' align='center'>
        <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
          {t('create_post.flow.steps.submit.not_in_review.title')}
        </Heading>
        <Text textAlign='center' color='gray.100' fontSize='md'>
          {t('create_post.flow.steps.submit.not_in_review.description')}
        </Text>
      </Flex>
    </LargeBackgroundBox>
  )
}
