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
import type DraftPostsQuery from '@//:artifacts/DraftPostsQuery.graphql'

type Props = {}
// TODO mutation for file uploads goes here

// Main upload component - handles all events from Uppy and renders the stepper
// also contains the main state and is responsible for recovering state when rendered (if state is available)
export default function FileUploader (props: Props): Node {
  const [state, dispatch] = useReducer<State, Action>(
    reducer,
    INITIAL_STATE
  )

  // hook controls lifecycle of uppy & restoring indexeddb state
  const [uppy] = useUpload(state, dispatch)

  const notify = useToast()

  // Add to thumbnails state when a new thumbnail is added
  useEffect(() => {
    uppy.on('thumbnail:generated', (file, preview) => {
      // dispatch({ type: EVENTS.THUMBNAILS, value: { [file.id]: preview } })
    })
  }, [uppy])

  // Urls - when upload is complete we have semi-public urls (you need to know the URL for it to work, and you need to be logged in to see it)
  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      // TODO buffer these for uploading or periodically check internal state?
      // TODO this needs to use the mutation on all successful files
      // TODO files that are uploading should not be "re-arrangeable"?
      // only want the ID from URL
      dispatch({ type: EVENTS.URLS, value: { [file.id]: response.uploadURL } })
    })
  }, [uppy])

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    uppy.on('upload-progress', (file, progress) => {
      dispatch({ type: EVENTS.PROGRESS, value: { [file.id]: { 0: progress.bytesUploaded, 1: progress.bytesTotal } } })
    })
  }, [uppy])

  // file-added- uppy file was added
  useEffect(() => {
    uppy.on('file-added', file => {
      dispatch({ type: EVENTS.FILES, value: { id: file.id, type: file.type } })
    })
  }, [uppy])

  // Event for errors
  useEffect(() => {
    uppy.on('upload-error', data => {
      // TODO highlight file with error and have a "retry" button
      notify({
        status: 'error',
        title: 'upload error',
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

  return (
    <CreatePost uppy={uppy} state={state} dispatch={dispatch} />
  )
}
