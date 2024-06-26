import { graphql, useFragment } from 'react-relay/hooks'
import type { MetaPublicPostFragment$key } from '@//:artifacts/MetaPublicPostFragment.graphql'
import type { MetaPublicPostViewerFragment$key } from '@//:artifacts/MetaPublicPostViewerFragment.graphql'
import PublicPostRichObject from './PublicPostRichObject/PublicPostRichObject'
import PublicPostStructuredData from './PublicPostStructuredData/PublicPostStructuredData'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import ContainerPublicPost from './ContainerPublicPost/ContainerPublicPost'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from '@chakra-ui/react'

interface Props {
  postQuery: MetaPublicPostFragment$key
  viewerQuery: MetaPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment MetaPublicPostFragment on Post {
    reference
    club {
      slug
    }
    ...PublicPostRichObjectFragment
    ...PublicPostStructuredDataFragment
    ...ContainerPublicPostFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaPublicPostViewerFragment on Account {
    ...ContainerPublicPostViewerFragment
  }
`

// Handle any meta tags, redirects, tracking, and other functions that
// don't provide a visible UI that the user can interact with
export default function MetaPublicPost (props: Props): JSX.Element {
  const {
    postQuery,
    viewerQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const router = useRouter()

  const [, setParamStep] = useQueryParam<string | null | undefined>('step')

  const { query: { slug } } = router

  useEffect(() => {
    if (slug != null && slug !== postData.club.slug) {
      void router.replace({
        pathname: '/[slug]/post/[reference]',
        query: {
          slug: postData?.club.slug,
          reference: postData?.reference
        }
      })
    }
  }, [slug])

  useEffect(() => {
    return () => {
      router.beforePopState(() => true)
    }
  }, [router])

  useUpdateEffect(() => {
    setParamStep(undefined)
  }, [postData.reference])

  return (
    <>
      <PublicPostRichObject query={postData} />
      <PublicPostStructuredData query={postData} />
      <ContainerPublicPost postQuery={postData} viewerQuery={viewerData} />
    </>
  )
}
