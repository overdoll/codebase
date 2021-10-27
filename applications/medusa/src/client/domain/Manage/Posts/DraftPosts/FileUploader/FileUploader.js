/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, useReducer } from 'react'
import type { Action, State } from '@//:types/upload'
import { EVENTS, INITIAL_STATE, STEPS } from './constants/constants'
import reducer from './reducer'
import useUpload from './hooks'
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import CreatePost from './components/CreatePost/CreatePost'

type Props = {}

// Main upload component - handles all events from Uppy and renders the stepper
// also contains the main state and is responsible for recovering state when rendered (if state is available)
export default function FileUploader (props: Props): Node {
  const [t] = useTranslation('manage')

  const [state, dispatch] = useReducer<State, Action>(
    reducer,
    INITIAL_STATE
  )

  // hook controls lifecycle of uppy & restoring indexeddb state
  const [uppy] = useUpload(state, dispatch)

  const notify = useToast()

  // Urls - when upload is complete we have semi-public urls (you need to know the URL for it to work, and you need to be logged in to see it)
  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      // only want the ID from URL
      if (file.source !== 'already-uploaded') {
        const url = response.uploadURL
        const fileId = url.substring(url.lastIndexOf('/') + 1)
        dispatch({ type: EVENTS.URLS, value: { [file.id]: fileId } })
      }
    })
  }, [uppy])

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    uppy.on('upload-progress', (file, progress) => {
      if (file.source !== 'already-uploaded') {
        dispatch({ type: EVENTS.PROGRESS, value: { [file.id]: { 0: progress.bytesUploaded, 1: progress.bytesTotal } } })
      }
    })
  }, [uppy])

  // file-added- uppy file was added
  useEffect(() => {
    uppy.on('file-added', file => {
      // remove uploaded file and emit error if upload limit is hit
      if ((state.file_limit + 1) > uppy.opts.restrictions.maxNumberOfFiles) {
        uppy.removeFile(file.id)
        uppy.info({
          message: t('posts.flow.steps.arrange.uploader.upload_limit', { count: uppy.opts.restrictions.maxNumberOfFiles })
        }, 'error')
        return
      }
      if (file.source !== 'already-uploaded') {
        dispatch({ type: EVENTS.FILES, value: { id: file.id, type: file.type } })
      }
    })
  }, [uppy])

  // Event for errors
  useEffect(() => {
    uppy.on('info-visible', () => {
      const info = uppy.getState().info

      const message = `${info.message}`

      notify({
        status: 'error',
        title: message,
        isClosable: true
      })
    })
  }, [notify, uppy])

  return (
    <CreatePost uppy={uppy} state={state} dispatch={dispatch} />
  )
}
