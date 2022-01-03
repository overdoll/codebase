import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { Action, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import { Reducer, useEffect, useReducer } from 'react'
import PostCreator from './components/PostCreator/PostCreator'
import { EVENTS, INITIAL_STATE } from './constants/constants'
import useUpload from './hooks'
import reducer from './reducer'
import { DispatchContext, StateContext, UppyContext } from './context'

export default function CreatePost (): JSX.Element {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    INITIAL_STATE,
    undefined
  )

  // hook controls lifecycle of uppy
  const [uppy] = useUpload(state, dispatch)

  const notify = useToast()

  // Urls - when upload is complete we have semi-public urls (you need to know the URL for it to work, and you need to be logged in to see it)
  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      // only want the ID from URL
      if (file.source !== 'already-uploaded') {
        const url = response.uploadURL as string
        const fileId = url.substring(url.lastIndexOf('/') + 1)
        dispatch({
          type: EVENTS.URLS,
          value: { [file.id]: fileId }
        })
      }
    })
  }, [uppy])

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    uppy.on('upload-progress', (file, progress) => {
      if (file.source !== 'already-uploaded') {
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
      // remove uploaded file and emit error if upload limit is hit
      if (file.source !== 'already-uploaded') {
        dispatch({
          type: EVENTS.FILES,
          value: {
            id: file.id,
            type: file.type
          }
        })
      }
    })
  }, [uppy])

  // Event for errors
  useEffect(() => {
    uppy.on('info-visible', () => {
      const info = uppy.getState().info

      if (info == null) return

      const message = `${info.message}`

      notify({
        status: 'error',
        title: message,
        isClosable: true
      })
    })
  }, [uppy])
  return (
    <>
      <Helmet title='create post' />
      <PageWrapper>
        <UppyContext.Provider value={uppy}>
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
              <PostCreator />
            </DispatchContext.Provider>
          </StateContext.Provider>
        </UppyContext.Provider>
      </PageWrapper>
    </>
  )
}
