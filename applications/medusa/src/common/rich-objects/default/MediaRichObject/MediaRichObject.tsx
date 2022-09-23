import { graphql, useFragment } from 'react-relay/hooks'
import type { MediaRichObjectFragment$key } from '@//:artifacts/MediaRichObjectFragment.graphql'
import React from 'react'
import Head from 'next/head'
import ImageRichObject from '../ImageRichObject/ImageRichObject'

interface Props {
  query: MediaRichObjectFragment$key | null
}

const ResourceFragment = graphql`
  fragment MediaRichObjectFragment on Media {
    __typename
    ...on VideoMedia {
      containers {
        __typename
        ...on MP4VideoContainer {
          __typename
          url
        }
      }
      duration
      cover {
        variants {
          small {
            url
          }
        }
      }
    }
    ...on ImageMedia {
      variants {
        small {
          url
          width
          height
        }
      }
    }
  }
`

export default function MediaRichObject (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(ResourceFragment, query)

  if (data == null) {
    return (
      <Head>
        <ImageRichObject />
      </Head>
    )
  }

  if (data.__typename === 'VideoMedia') {
    const urls = data.containers.map(item => item.__typename === 'MP4VideoContainer' ? ({ url: item.url }) : ({}))

    const mp4Url = urls.filter((item) => item.url != null)?.[0].url

    return (
      <Head>
        <meta name='twitter:card' content='player' />
        <meta property='og:type' content='video' />
        <meta property='og:video' content={mp4Url} />
        <meta property='og:video:secure_url' content={mp4Url} />
        <meta property='og:video:type' content='video/mp4' />
        <meta property='og:video:duration' content={`${(data.duration / 1000).toFixed(2)}`} />
        <meta property='twitter:image' content={data.cover.variants.small.url} />
        <ImageRichObject />
      </Head>
    )
  }

  if (data.__typename === 'ImageMedia') {
    return (
      <Head>
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:type' content='image' />
        <meta property='og:image' content={data.variants.small.url} />
        <meta property='og:image:secure_url' content={data.variants.small.url} />
        <meta property='og:image:type' content='image/jpeg' />
        <meta property='og:image:width' content={`${data.variants.small.width}`} />
        <meta property='og:image:height' content={`${data.variants.small.height}`} />
        <ImageRichObject />
      </Head>
    )
  }

  return (
    <Head>
      <ImageRichObject />
    </Head>
  )
}
