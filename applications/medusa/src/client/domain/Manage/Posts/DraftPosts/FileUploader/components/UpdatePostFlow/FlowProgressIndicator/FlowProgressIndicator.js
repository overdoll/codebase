/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import type { State } from '@//:types/upload'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Progress,
  Heading,
  Text,
  CloseButton
} from '@chakra-ui/react'
import { STEPS } from '../../../constants/constants'
import { useTranslation } from 'react-i18next'

type Props = {
  state: State,
  onCancel: () => void,
}

export default function FlowProgressIndicator ({ state, onCancel }: Props): Node {
  const [t] = useTranslation('manage')

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
    <Flex bg='gray.800' p={2} borderRadius={15} align='center' justify='space-between'>
      <Flex align='center'>
        <CircularProgress capIsRound size='72px' color='primary.500' thickness='6px' value={20}>
          <CircularProgressLabel>20%</CircularProgressLabel>
        </CircularProgress>
        <Box ml={4}>
          <>
            <Heading color='gray.100' fontSize='2xl'>
              {findText()[0]}
            </Heading>
            <Text color='gray.200' fontSize='md'>
              {findText()[1]}
            </Text>
          </>
        </Box>
      </Flex>
      <CloseButton size='lg' onClick={onCancel} />
    </Flex>
  )
}
