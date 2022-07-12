import { PageWrapper } from '@//:modules/content/PageLayout'
import { Suspense, useEffect } from 'react'
import PostCreator from './PostCreator/PostCreator'
import { useQueryParam } from 'use-query-params'
import { PreloadableConcreteRequest, PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import PostCreatorQuery, { PostCreatorQuery as PostCreatorQueryType } from '@//:artifacts/PostCreatorQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import {
  ArrayResolver,
  ObjectResolver,
  SequenceProvider,
  useSequence,
  ValueResolver
} from '@//:modules/content/HookedComponents/Sequence'
import { SequenceResolver } from '@//:modules/content/HookedComponents/Sequence/types'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import { UppyFile } from '@uppy/core'
import { FileErrorType } from '@//:modules/content/HookedComponents/Upload/types'

interface Props {
  queryRefs: {
    postCreatorQuery: PreloadedQuery<PostCreatorQueryType>
  }
}

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
  content: string[]
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
  isProcessing: boolean
  isInReview: boolean
  isSubmitted: boolean
  isRearranging: boolean
}

const defaultValue: SequenceProps = {
  files: {},
  urls: {},
  content: [],
  audience: {},
  characters: {},
  categories: {},
  errors: {},
  isProcessing: false,
  isInReview: false,
  isSubmitted: false,
  isRearranging: false
}

const resolver: SequenceResolver<SequenceProps> = {
  files: ObjectResolver(),
  urls: ObjectResolver(),
  errors: ObjectResolver(),
  content: ArrayResolver(),
  audience: ObjectResolver(),
  characters: ObjectResolver(),
  categories: ObjectResolver(),
  isProcessing: ValueResolver(),
  isInReview: ValueResolver(),
  isSubmitted: ValueResolver(),
  isRearranging: ValueResolver()
}

const CreatePost: PageProps<Props> = (props: Props) => {
  const methods = useSequence<SequenceProps>({
    defaultValue: defaultValue,
    resolver: resolver
  })

  const [postReference] = useQueryParam<string | null | undefined>('post')

  const [queryRef, loadQuery] = useQueryLoader(
    PostCreatorQuery as PreloadableConcreteRequest<PostCreatorQueryType>,
    props.queryRefs.postCreatorQuery
  )

  const { query: { slug } } = useRouter()

  useEffect(() => {
    if (slug == null) return
    loadQuery({
      reference: postReference ?? '',
      slug: slug as string
    })
  }, [postReference, slug])

  return (
    <>
      <Head>
        <title>
          Create a Post - overdoll
        </title>
      </Head>
      <PageWrapper>
        <SequenceProvider {...methods}>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            reference: postReference ?? '',
            slug: slug as string
          })}
          >
            <Suspense fallback={<SkeletonPost />}>
              <PostCreator query={queryRef as PreloadedQuery<PostCreatorQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </SequenceProvider>
      </PageWrapper>
    </>
  )
}

export default CreatePost
