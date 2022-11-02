import { graphql, useFragment } from 'react-relay/hooks'
import type { MetaCreatePostFragment$key } from '@//:artifacts/MetaCreatePostFragment.graphql'
import type { MetaCreatePostClubFragment$key } from '@//:artifacts/MetaCreatePostClubFragment.graphql'
import CreatePostRichObject from './CreatePostRichObject/CreatePostRichObject'
import { useUpdateEffect } from '@chakra-ui/react'
import {
  FileErrorType,
  OnFileAddedType,
  OnFileRemovedType,
  OnUploadErrorType,
  OnUploadProgressType,
  OnUploadRetryType,
  OnUploadSuccessType
} from '@//:modules/content/HookedComponents/Upload/types'
import getIdFromUppyUrl from '@//:modules/content/HookedComponents/Upload/support/getIdFromUppyUrl/getIdFromUppyUrl'
import { CreatePostUppy, UppyProvider, useUpload } from '@//:modules/content/HookedComponents/Upload'
import {
  ObjectResolver,
  SequenceProvider,
  useSequence,
  ValueResolver
} from '@//:modules/content/HookedComponents/Sequence'
import { UppyFile } from '@uppy/core'
import { SequenceResolver } from '@//:modules/content/HookedComponents/Sequence/types'
import ContainerCreatePost from './ContainerCreatePost/ContainerCreatePost'

interface Props {
  postQuery: MetaCreatePostFragment$key | null
  clubQuery: MetaCreatePostClubFragment$key
}

const PostFragment = graphql`
  fragment MetaCreatePostFragment on Post {
    id
    ...ContainerCreatePostFragment
  }
`

const ClubFragment = graphql`
  fragment MetaCreatePostClubFragment on Club {
    ...ContainerCreatePostClubFragment
  }
`

interface SequenceProps {
  files: {
    [id: string]: UppyFile
  }
  errors: {
    [id: string]: FileErrorType
  }
  urls: {
    [id: string]: string
  }
  audience: {
    [id: string]: string
  }
  characters: {
    [id: string]: {
      name: string
    }
  }
  categories: {
    [id: string]: {
      title: string
    }
  }
  isInReview: boolean
  isSubmitted: boolean
  deepValue: string | null
}

const defaultValue: SequenceProps = {
  files: {},
  urls: {},
  audience: {},
  characters: {},
  categories: {},
  errors: {},
  isInReview: false,
  isSubmitted: false,
  deepValue: null
}

const resolver: SequenceResolver<SequenceProps> = {
  files: ObjectResolver(),
  urls: ObjectResolver(),
  errors: ObjectResolver(),
  audience: ObjectResolver(),
  characters: ObjectResolver(),
  categories: ObjectResolver(),
  isInReview: ValueResolver(),
  isSubmitted: ValueResolver(),
  deepValue: ValueResolver()
}

export default function MetaCreatePost ({
  postQuery,
  clubQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const clubData = useFragment(ClubFragment, clubQuery)

  const methods = useSequence<SequenceProps>({
    defaultValue: defaultValue,
    resolver: resolver
  })

  const { dispatch } = methods

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
    if (postData?.id == null) {
      uppy.reset()
    }
  }, [postData?.id])

  return (
    <>
      <CreatePostRichObject />
      <SequenceProvider {...methods}>
        <UppyProvider uppy={uppy}>
          <ContainerCreatePost postQuery={postData} clubQuery={clubData} />
        </UppyProvider>
      </SequenceProvider>
    </>
  )
}
