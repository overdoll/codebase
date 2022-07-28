import { graphql, useFragment } from 'react-relay/hooks'
import type { ResourceRichObjectFragment$key } from '@//:artifacts/ResourceRichObjectFragment.graphql'
import React, { Fragment as ReactFragment } from 'react'
import Head from 'next/head'
import ImageRichObject from '../ImageRichObject/ImageRichObject'

interface Props {
  query: ResourceRichObjectFragment$key | null
}

const Fragment = graphql`
  fragment ResourceRichObjectFragment on Resource {
    urls {
      url
      mimeType
    }
    width
    height
    type
  }
`

export default function ResourceRichObject ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <>
      <Head>
        {data?.urls.map((item, index) => {
          const type = data.type === 'IMAGE' ? 'image' : 'video'
          return (
            <ReactFragment key={index}>
              <meta property={`og:${type}`} content={item.url} />
              <meta property={`og:${type}:secure_url`} content={item.url} />
              <meta property={`og:${type}:type`} content={item.mimeType} />
              <meta property={`og:${type}:width`} content={`${data.width}`} />
              <meta property={`og:${type}:height`} content={`${data.height}`} />
            </ReactFragment>
          )
        })}

      </Head>
      <ImageRichObject />
    </>
  )
}
