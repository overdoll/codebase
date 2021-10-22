/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import type { Dispatch, State } from '@//:types/upload'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Progress,
  Heading,
  Text,
  CloseButton, Spacer
} from '@chakra-ui/react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../constants/constants'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import FlowBackwardButton from './FlowBackwardButton/FlowBackwardButton'
import FlowForwardButton from './FlowForwardButton/FlowForwardButton'
import Button from '@//:modules/form/Button'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  disableNavigation: boolean,
}

export default function FlowFooter ({ state, uppy, dispatch, disableNavigation }: Props): Node {
  const [t] = useTranslation('manage')

  if (state.step !== STEPS.SUBMIT) {
    return (
      <>
        <FlowBackwardButton uppy={uppy} dispatch={dispatch} state={state} isDisabled={disableNavigation} />
        <Spacer />
        <FlowForwardButton uppy={uppy} dispatch={dispatch} state={state} isDisabled={disableNavigation} />
      </>
    )
  }
  return (
    <Button
      colorScheme='gray' size='lg' onClick={() => dispatch({
        type: EVENTS.CLEANUP,
        value: INITIAL_STATE
      })}
    >{t('posts.flow.steps.footer.retry')}
    </Button>
  )
}
