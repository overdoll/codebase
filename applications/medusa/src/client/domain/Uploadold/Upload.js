/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, useReducer } from 'react'
import type { Action, State } from '@//:types/upload'
import { EVENTS, INITIAL_STATE, STEPS } from './constants/constants'
import reducer from './reducer'
import useUpload from './hooks'
import { Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

// Main upload component - handles all events from Uppy and renders the stepper
// also contains the main state and is responsible for recovering state when rendered (if state is available)
export default function Upload (): Node {
  const [state, dispatch] = useReducer<State, Action>(
    reducer,
    INITIAL_STATE
  )

  // hook controls lifecycle of uppy & restoring indexeddb state
  const [uppy, isLoaded] = useUpload(state, dispatch)

  const [t] = useTranslation('general')
  // load the upload namespace
  useTranslation('upload')

  const notify = useToast()

  // Add to thumbnails state when a new thumbnail is added
  useEffect(() => {
    uppy.on('thumbnail:generated', (file, preview) => {
      if (file.source !== 'indexeddb') {
        dispatch({
          type: EVENTS.THUMBNAILS,
          value: { [file.id]: preview }
        })
      }
    })
  }, [uppy])

  // Urls - when upload is complete we have semi-public urls (you need to know the URL for it to work, and you need to be logged in to see it)
  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      if (file.source !== 'indexeddb') {
        dispatch({
          type: EVENTS.URLS,
          value: { [file.id]: response.uploadURL }
        })
        dispatch({
          type: EVENTS.PROGRESS,
          value: {
            [file.id]: {
              0: file.progress.bytesTotal,
              1: file.progress.bytesTotal
            }
          }
        })
      }
    })
  }, [uppy])

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    uppy.on('upload-progress', (file, progress) => {
      if (file.source !== 'indexeddb') {
        dispatch({
          type: EVENTS.PROGRESS,
          value: {
            [file.id]: {
              0: progress.bytesUploaded,
              1: progress.bytesTotal
            }
          }
        })
      }
    })
  }, [uppy])

  // file-added- uppy file was added
  useEffect(() => {
    uppy.on('file-added', file => {
      if (file.source !== 'indexeddb') {
        dispatch({ type: EVENTS.FILES, value: { id: file.id, type: file.type } })
        if (state.step === null) {
          dispatch({ type: EVENTS.STEP, value: STEPS.ARRANGE })
        }
      }
    })
  }, [uppy])

  // Event for errors
  useEffect(() => {
    uppy.on('upload-error', data => {
      notify({
        status: 'error',
        title: 'upload error',
        isClosable: true
      })
    })

    uppy.on('restriction-failed', (file, error) => {
      notify({
        status: 'error',
        title: 'restriction error',
        isClosable: true
      })
    })

    uppy.on('info-visible', () => {
      const info = uppy.getState().info

      const message = `${info.message} ${info.details}`

      if (info.type === 'error') {
        notify({
          status: 'error',
          title: message,
          isClosable: true
        })
      } else {
        notify({
          status: 'warning',
          title: message,
          isClosable: true
        })
      }
    })
  }, [notify, uppy])

  if (!isLoaded) {
    return (
      <Flex mt={40} h='100%' align='center' justify='center' direction='column'>
        <Spinner mb={6} thickness={4} size='xl' color='primary.500' />
        <Heading mb={1} size='md' color='gray.00'>{t('loading.header')}</Heading>
        <Text size='sm' color='gray.100'>{t('loading.subheader')}</Text>
      </Flex>
    )
  }
  // <Steps uppy={uppy} state={state} dispatch={dispatch} />

  return (
    <>
      <Helmet title='upload' />

    </>
  )
}
