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
        videoDuration
        videoThumbnail {
          url
        }
      }
    }
  }
`

export default function PostContentRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(PostFragment, query)

  // only show the first piece of post content
  const content = data?.content?.[0]

  // only show jpg and mp4 files as they are universally supported
  const filteredUrls = content.resource.type === 'IMAGE' ? content.resource.urls.filter((item) => item.mimeType === 'image/jpg') : content.resource.urls.filter((item) => item.mimeType === 'video/mp4')

  return (
    <Head>
      {content.resource.type === 'IMAGE'
        ? <meta name='twitter:card' content='summary_large_image' />
        : <meta name='twitter:card' content='player' />}
      {filteredUrls.map((item, index) => {
        const type = content.resource.type === 'IMAGE' ? 'image' : 'video'
        return (
          <Fragment key={index}>
            <meta property='og:type' content={type} />
            <meta property={`og:${type}`} content={item.url} />
            <meta property={`og:${type}:secure_url`} content={item.url} />
            <meta property={`og:${type}:type`} content={item.mimeType} />
            <meta property={`og:${type}:width`} content={`${content.resource.width}`} />
            <meta property={`og:${type}:height`} content={`${content.resource.height}`} />
            {content.resource.videoDuration !== 0 && (
              <meta property='og:video:duration' content={`${(content.resource.videoDuration / 1000).toFixed(2)}`} />
            )}
            {content.resource.videoThumbnail != null && (
              <meta property='twitter:image' content={content.resource.videoThumbnail.url} />
            )}
          </Fragment>
        )
      })}
      <ImageRichObject />
    </Head>
  )
}
