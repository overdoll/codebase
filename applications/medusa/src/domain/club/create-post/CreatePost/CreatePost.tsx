import { Suspense, useEffect } from 'react'
import PostCreator from './PostCreator/PostCreator'
import { useQueryParam } from 'use-query-params'
import { PreloadableConcreteRequest, PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import PostCreatorQuery, { PostCreatorQuery as PostCreatorQueryType } from '@//:artifacts/PostCreatorQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import {
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
import { PageWrapper } from '@//:modules/content/PageLayout'

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
}

const defaultValue: SequenceProps = {
  files: {},
  urls: {},
  audience: {},
  characters: {},
  categories: {},
  errors: {},
  isInReview: false,
  isSubmitted: false
}

const resolver: SequenceResolver<SequenceProps> = {
  files: ObjectResolver(),
  urls: ObjectResolver(),
  errors: ObjectResolver(),
  audience: ObjectResolver(),
  characters: ObjectResolver(),
  categories: ObjectResolver(),
  isInReview: ValueResolver(),
  isSubmitted: ValueResolver()
}

const CreatePost: PageProps<Props> = (props: Props) => {
  const methods = useSequence<SequenceProps>({
    defaultValue: defaultValue,
    resolver: resolver
  })

  const [queryRef, loadQuery] = useQueryLoader(
    PostCreatorQuery as PreloadableConcreteRequest<PostCreatorQueryType>,
    props.queryRefs.postCreatorQuery
  )

  const { query: { slug } } = useRouter()

  const [postReference] = useQueryParam<string | null | undefined>('post')

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
