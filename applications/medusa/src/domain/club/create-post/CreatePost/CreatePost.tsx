import { PageWrapper } from '@//:modules/content/PageLayout'
import { Suspense, useEffect } from 'react'
import PostCreator from './components/PostCreator/PostCreator'
import { UppyContext } from './context'
import { useQueryParam } from 'use-query-params'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import PostCreatorQuery, { PostCreatorQuery as PostCreatorQueryType } from '@//:artifacts/PostCreatorQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import useUpload from './hooks/useUpload'
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

interface Props {
  queryRefs: {
    postCreatorQuery: PreloadedQuery<PostCreatorQueryType>
  }
}

interface SequenceProps {
  progress: {
    [id: string]: {
      0: string
      1: string
    }
  }
  files: Array<{ id: string, type: string }>
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
}

const defaultValue: SequenceProps = {
  progress: {},
  files: [],
  urls: {},
  content: [],
  audience: {},
  characters: {},
  categories: {},
  isProcessing: false,
  isInReview: false,
  isSubmitted: false
}

const resolver: SequenceResolver<SequenceProps> = {
  progress: ObjectResolver(),
  files: ArrayResolver(),
  urls: ObjectResolver(),
  content: ArrayResolver(),
  audience: ObjectResolver(),
  characters: ObjectResolver(),
  categories: ObjectResolver(),
  isProcessing: ValueResolver(),
  isInReview: ValueResolver(),
  isSubmitted: ValueResolver()
}

const CreatePost: PageProps<Props> = (props: Props) => {
  const uppy = useUpload()

  const methods = useSequence<SequenceProps>({
    defaultValue: defaultValue,
    resolver: resolver
  })

  const [postReference] = useQueryParam<string | null | undefined>('post')

  const [queryRef, loadQuery] = useQueryLoader(
    PostCreatorQuery,
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
          Create a Post :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <SequenceProvider {...methods}>
          <UppyContext.Provider value={uppy}>
            <QueryErrorBoundary loadQuery={() => loadQuery({
              reference: postReference ?? '',
              slug: slug as string
            })}
            >
              <Suspense fallback={<SkeletonPost />}>
                <PostCreator query={queryRef as PreloadedQuery<PostCreatorQueryType>} />
              </Suspense>
            </QueryErrorBoundary>
          </UppyContext.Provider>
        </SequenceProvider>
      </PageWrapper>
    </>
  )
}

export default CreatePost
