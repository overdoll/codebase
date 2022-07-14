import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PostCreatorQuery } from '@//:artifacts/PostCreatorQuery.graphql'
import PostState from './PostState/PostState'
import getIdFromUppyUrl from '@//:modules/content/HookedComponents/Upload/support/getIdFromUppyUrl/getIdFromUppyUrl'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import ClubRestricted from '../ClubRestricted/ClubRestricted'
import { CreatePostUppy, UppyProvider, useUpload } from '@//:modules/content/HookedComponents/Upload'
import {
  OnFileAddedType,
  OnFileRemovedType,
  OnUploadErrorType,
  OnUploadProgressType,
  OnUploadRetryType,
  OnUploadSuccessType
} from '@//:modules/content/HookedComponents/Upload/types'
import { useUpdateEffect } from '@chakra-ui/react'

interface Props {
  query: PreloadedQuery<PostCreatorQuery>
}

const Query = graphql`
  query PostCreatorQuery ($reference: String!, $slug: String!) {
    post (reference: $reference) {
      __typename
      id
      ...PostStateFragment
    }
    club (slug: $slug) {
      __typename

      suspension {
        __typename
      }
      termination {
        __typename
      }
      viewerIsOwner
      ...PostStateClubFragment
      ...ClubRestrictedFragment
    }
  }
`

export default function PostCreator ({ query }: Props): JSX.Element {
  const data = usePreloadedQuery<PostCreatorQuery>(
    Query,
    query
  )

  const {
    state,
    dispatch
  } = useSequenceContext()

  const onFileAdded: OnFileAddedType = (file) => {
    if (file.source !== 'already-uploaded') {
      dispatch({
        type: 'files',
        value: { [file.id]: file },
        transform: 'ADD'
      })
    }
  }

  const onUploadProgress: OnUploadProgressType = (file) => {
    if (file.source !== 'already-uploaded') {
      dispatch({
        type: 'files',
        value: { [file.id]: file },
        transform: 'ADD'
      })
    }
  }

  const onUploadSuccess: OnUploadSuccessType = (file, response) => {
    if (file.source !== 'already-uploaded') {
      const url = response.uploadURL as string
      dispatch({
        type: 'urls',
        value: { [file.id]: getIdFromUppyUrl(url) },
        transform: 'ADD'
      })
      dispatch({
        type: 'files',
        value: { [file.id]: file },
        transform: 'ADD'
      })
    }
  }

  const onFileRemoved: OnFileRemovedType = (file, reason) => {
    dispatch({
      type: 'files',
      value: { [file.id]: file },
      transform: 'REMOVE'
    })
    dispatch({
      type: 'urls',
      value: { [file.id]: file.id },
      transform: 'REMOVE'
    })
    dispatch({
      type: 'errors',
      value: {
        [file.id]: {
          error: undefined,
          response: undefined
        }
      },
      transform: 'REMOVE'
    })
  }

  const onUploadError: OnUploadErrorType = (file, error, response) => {
    if (file.source !== 'already-uploaded') {
      dispatch({
        type: 'errors',
        value: {
          [file.id]: {
            error: error,
            response: response
          }
        },
        transform: 'ADD'
      })
    }
  }

  const onUploadRetry: OnUploadRetryType = (fileId) => {
    dispatch({
      type: 'errors',
      value: {
        [fileId]: {
          error: undefined,
          response: undefined
        }
      },
      transform: 'REMOVE'
    })
  }

  const uppy = useUpload({
    uppy: CreatePostUppy,
    onUploadSuccess,
    onUploadProgress,
    onFileAdded,
    onFileRemoved,
    onUploadError,
    onUploadRetry
  })

  useUpdateEffect(() => {
    if (data?.post?.id == null) {
      uppy.reset()
    }
  }, [data?.post?.id])

  if (data?.club?.viewerIsOwner === false) {
    return <NotFoundClub />
  }

  if (data?.club != null && (data.club?.suspension != null || data.club?.termination != null)) {
    return <ClubRestricted query={data.club} />
  }

  return (
    <UppyProvider uppy={uppy}>
      <PostState postQuery={data.post} clubQuery={data.club} />
    </UppyProvider>
  )
}
