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
  OnUploadProgressType,
  OnUploadSuccessType
} from '@//:modules/content/HookedComponents/Upload/types'

interface Props {
  query: PreloadedQuery<PostCreatorQuery>
}

const Query = graphql`
  query PostCreatorQuery ($reference: String!, $slug: String!) {
    post (reference: $reference) {
      __typename
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
        value: [{
          id: file.id,
          type: file.type
        }],
        transform: 'ADD'
      })
    }
  }

  const onUploadProgress: OnUploadProgressType = (file, progress) => {
    if (file.source !== 'already-uploaded') {
      dispatch({
        type: 'progress',
        value: {
          [file.id]: {
            0: progress.bytesUploaded,
            1: progress.bytesTotal
          }
        },
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
    }
  }

  const onFileRemoved: OnFileRemovedType = (file, reason) => {
    dispatch({
      type: 'files',
      value: [{ id: file.id }],
      transform: 'REMOVE'
    })
    dispatch({
      type: 'progress',
      value: { [file.id]: state.progress[file.id] },
      transform: 'REMOVE'
    })
    dispatch({
      type: 'urls',
      value: { [file.id]: state.urls[file.id] },
      transform: 'REMOVE'
    })
  }

  const uppy = useUpload({
    uppy: CreatePostUppy,
    onUploadSuccess: onUploadSuccess,
    onUploadProgress: onUploadProgress,
    onFileAdded: onFileAdded,
    onFileRemoved: onFileRemoved
  })

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
