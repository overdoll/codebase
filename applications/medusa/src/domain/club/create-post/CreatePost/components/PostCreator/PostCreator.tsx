import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PostCreatorQuery } from '@//:artifacts/PostCreatorQuery.graphql'
import PostState from './PostState/PostState'
import { useContext, useEffect } from 'react'
import getIdFromUppyUrl from '../../hooks/getIdFromUppyUrl/getIdFromUppyUrl'
import { UppyContext } from '../../context'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import ClubRestricted from '../ClubRestricted/ClubRestricted'

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
  const notify = useToast()

  const uppy = useContext(UppyContext)

  const { dispatch } = useSequenceContext()

  // Urls - when upload is complete we have semi-public urls
  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      // only want the ID from URL
      if (file.source !== 'already-uploaded') {
        const url = response.uploadURL as string
        dispatch({
          type: 'urls',
          value: { [file.id]: getIdFromUppyUrl(url) },
          transform: 'ADD'
        })
      }
    })
  }, [uppy])

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    uppy.on('upload-progress', (file, progress) => {
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
    })
  }, [uppy])

  // file-added- uppy file was added
  useEffect(() => {
    uppy.on('file-added', file => {
      // remove uploaded file and emit error if upload limit is hit
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
        title: message
      })
    })
  }, [uppy])

  if (data?.club?.viewerIsOwner === false) {
    return <NotFoundClub />
  }

  if (data?.club != null && (data.club?.suspension != null || data.club?.termination != null)) {
    return <ClubRestricted query={data.club} />
  }

  return (
    <PostState postQuery={data.post} clubQuery={data.club} />
  )
}
