import { graphql, useFragment } from 'react-relay/hooks'
import type { addPostContentJsonLdFragment$key } from '@//:artifacts/addPostContentJsonLdFragment.graphql'
import { DOMAttributes } from 'react'
import { getPostDescription, getPostTitle } from '@//:modules/support/metaHelpers'

const Fragment = graphql`
  fragment addPostContentJsonLdFragment on Post {
    reference
    postedAt
    club {
      slug
      name
    }
    characters {
      name
    }
    categories {
      title
    }
    content {
      resource {
        urls {
          url
        }
        height
        width
        type
        videoThumbnail {
          url
        }
      }
    }
  }
`

export default function addPostContentJsonLd (query: addPostContentJsonLdFragment$key): DOMAttributes<string>['dangerouslySetInnerHTML'] {
  const data = useFragment(Fragment, query)

  const postLink = `https://www.overdoll.com/${data.club.slug}/post/${data.reference}`

  const clubLink = `https://www.overdoll.com/${data.club.slug}`

  const characters = data.characters.map((item) => item.name)

  const keywords = data.categories.map((item) => item.title).join(',')

  const postTitle = getPostTitle(characters, data.club.name)

  const postDescription = getPostDescription(characters, data.club.name)

  const videoObjects = data.content.filter((item) => item.resource.type === 'VIDEO')

  const imageObjects = data.content.filter((item) => item.resource.type === 'IMAGE')

  const dataObjects = {
    ...(videoObjects.length > 0 && {
      video: videoObjects.map((videoItem) => ({
        '@type': 'VideoObject',
        '@id': postLink,
        contentUrl: videoItem.resource.urls[0].url,
        url: videoItem.resource.urls[0].url,
        author: data.club.name,
        creator: data.club.name,
        description: postDescription,
        height: videoItem.resource.height,
        keywords: keywords,
        name: postTitle,
        ...(videoItem.resource.videoThumbnail?.url != null && { thumbnailUrl: videoItem.resource.videoThumbnail.url }),
        uploadDate: data.postedAt,
        width: videoItem.resource.width
      }))
    }),
    ...(imageObjects.length > 0 && (
      {
        image: imageObjects.map((imageObject) => ({
          '@type': 'ImageObject',
          '@id': postLink,
          contentUrl: imageObject.resource.urls[0].url,
          url: imageObject.resource.urls[0].url,
          author: data.club.name,
          creator: data.club.name,
          description: postDescription,
          height: imageObject.resource.height,
          keywords: keywords,
          name: postTitle,
          width: imageObject.resource.width
        }))
      }
    ))
  }

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'SocialMediaPosting',
    url: postLink,
    headline: postTitle,
    keywords: keywords,
    mainEntityOfPage: true,
    description: postDescription,
    author: {
      type: 'Person',
      name: data.club.name,
      url: clubLink
    },
    ...dataObjects
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
