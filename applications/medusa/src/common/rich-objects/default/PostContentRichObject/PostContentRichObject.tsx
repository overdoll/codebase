import { graphql, useFragment } from 'react-relay/hooks'
import type { PostContentRichObjectFragment$key } from '@//:artifacts/PostContentRichObjectFragment.graphql'
import React, { Fragment } from 'react'
import Head from 'next/head'
import ImageRichObject from '../ImageRichObject/ImageRichObject'

interface Props {
  query: PostContentRichObjectFragment$key
}

const PostFragment = graphql`
  fragment PostContentRichObjectFragment on Post {
    content {
      resource {
        urls {
          url
          mimeType
        }
        width
        height
        type
      }
    }
  }
`

export default function PostContentRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(PostFragment, query)

  const content = data?.content?.[0]

  return (
    <Head>
      {content?.resource.urls.map((item, index) => {
        const type = content.resource.type === 'IMAGE' ? 'image' : 'video'
        return (
          <Fragment key={index}>
            <meta property={`og:${type}`} content={item.url} />
            <meta property={`og:${type}:secure_url`} content={item.url} />
            <meta property={`og:${type}:type`} content={item.mimeType} />
            <meta property={`og:${type}:width`} content={`${content.resource.width}`} />
            <meta property={`og:${type}:height`} content={`${content.resource.height}`} />
          </Fragment>
        )
      })}
      <ImageRichObject />
    </Head>
  )
}
