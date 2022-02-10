import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { useToast } from '@chakra-ui/react'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import PostCreator from './components/PostCreator/PostCreator'
import { UppyContext } from './context'
import { useQueryParam } from 'use-query-params'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import PostCreatorQuery, { PostCreatorQuery as PostCreatorQueryType } from '@//:artifacts/PostCreatorQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import getIdFromUppyUrl from './hooks/getIdFromUppyUrl/getIdFromUppyUrl'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { useReducerBuilder } from '@//:modules/hooks'
import { singleStringValueReducer } from '@//:modules/hooks/useReducerBuilder/options'
import objectCategoryValueReducer from '@//:modules/hooks/useReducerBuilder/options/objectCategoryValueReducer'
import arrayValueReducer from '@//:modules/hooks/useReducerBuilder/options/arrayValueReducer'
import { Uppy } from '@uppy/core'
import UppyInstance from './hooks/uppy/Uppy'
import { DispatchContext, StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import uploadObjectsReducer from '@//:modules/hooks/useReducerBuilder/options/uploadObjectsReducer'

interface Props {
  prepared: {
    query: PreloadedQuery<PostCreatorQueryType>
  }
}

export default function CreatePost (props: Props): JSX.Element {
  const initUppy = useRef<Uppy | undefined>(undefined)

  if (initUppy.current === undefined) {
    initUppy.current = UppyInstance
  }

  const uppy = initUppy.current

  const [state, dispatch] = useReducerBuilder({
    uploads: uploadObjectsReducer({ dispatchType: 'uploads' }),
    audience: singleStringValueReducer({ dispatchType: 'audience' }),
    content: arrayValueReducer({ dispatchType: 'content' }),
    categories: objectCategoryValueReducer({ dispatchType: 'categories' }),
    characters: objectCategoryValueReducer({ dispatchType: 'characters' }),
    isProcessing: singleStringValueReducer({
      dispatchType: 'isProcessing',
      defaultValue: { value: false }
    }),
    isInReview: singleStringValueReducer({
      dispatchType: 'isInReview',
      defaultValue: { value: false }
    }),
    isSubmitted: singleStringValueReducer({
      dispatchType: 'isSubmitted',
      defaultValue: { value: false }
    })

  })

  const [postReference] = useQueryParam<string | null | undefined>('post')

  const [queryRef, loadQuery] = useQueryLoader(
    PostCreatorQuery,
    props.prepared.query
  )

  const notify = useToast()

  const params = useParams()

  const memoSlug = useMemo(() => {
    return params.slug
  }, [params.slug])

  // Urls - when upload is complete we have semi-public urls
  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      // only want the ID from URL
      if (file.source !== 'already-uploaded') {
        const url = response.uploadURL as string
        dispatch({
          type: 'uploads_urls',
          value: { [file.id]: getIdFromUppyUrl(url) }
        })
      }
    })
  }, [uppy])

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    uppy.on('upload-progress', (file, progress) => {
      if (file.source !== 'already-uploaded') {
        dispatch({
          type: 'uploads_progress',
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
          type: 'uploads_files',
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

  useEffect(() => {
    if (memoSlug == null) return
    loadQuery({
      reference: postReference ?? '',
      slug: memoSlug
    })
  }, [postReference, memoSlug])

  return (
    <>
      <Helmet title='create post' />
      <PageWrapper>
        <UppyContext.Provider value={uppy}>
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
              <QueryErrorBoundary loadQuery={() => loadQuery({
                reference: postReference ?? '',
                slug: params.slug as string
              })}
              >
                <Suspense fallback={<SkeletonPost />}>
                  <PostCreator query={queryRef as PreloadedQuery<PostCreatorQueryType>} />
                </Suspense>
              </QueryErrorBoundary>
            </DispatchContext.Provider>
          </StateContext.Provider>
        </UppyContext.Provider>
      </PageWrapper>
    </>
  )
}
