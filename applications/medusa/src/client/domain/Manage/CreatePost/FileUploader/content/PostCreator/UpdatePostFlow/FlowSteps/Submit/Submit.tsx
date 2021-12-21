import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import { EVENTS, INITIAL_STATE } from '../../../../../constants/constants'
import Button from '@//:modules/form/Button/Button'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
}

export default function Submit ({
  uppy,
  state,
  dispatch
}: Props): JSX.Element {
  const [t] = useTranslation('manage')

  const onRetry = (): void => {
    dispatch({
      type: EVENTS.CLEANUP,
      value: INITIAL_STATE
    })
  }

  if (state.isInReview) {
    return (
      <PostPlaceholder>
        <Box>
          <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
            {t('create_post.flow.steps.submit.in_review.title')}
          </Heading>
          <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
            {t('create_post.flow.steps.submit.in_review.description')}
          </Text>
        </Box>
        <Button
          variant='solid'
          colorScheme='primary'
          size='lg'
          onClick={onRetry}
        >{t('create_post.flow.steps.footer.retry')}
        </Button>
      </PostPlaceholder>
    )
  }

  return (
    <PostPlaceholder>
      <Box>
        <Heading mb={2} textAlign='center' color='gray.00' fontSize='2xl'>
          {t('create_post.flow.steps.submit.not_in_review.title')}
        </Heading>
        <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
          {t('create_post.flow.steps.submit.not_in_review.description')}
        </Text>
      </Box>
      <Button
        variant='solid'
        colorScheme='primary'
        size='lg'
        onClick={onRetry}
      >{t('create_post.flow.steps.footer.retry')}
      </Button>
    </PostPlaceholder>
  )
}
