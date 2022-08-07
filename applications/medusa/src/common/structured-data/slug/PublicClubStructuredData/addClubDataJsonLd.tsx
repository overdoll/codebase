import { PreactDOMAttributes } from 'preact'
import { graphql, useFragment } from 'react-relay/hooks'
import type { addClubDataJsonLdFragment$key } from '@//:artifacts/addClubDataJsonLdFragment.graphql'
import { getClubDescription } from '../../../rich-objects/slug/PublicClubRichObject/PublicClubRichObject'

const Fragment = graphql`
  fragment addClubDataJsonLdFragment on Club {
    name
    slug
    thumbnail {
      urls {
        url
      }
    }
  }
`

export default function addClubDataJsonLd (query: addClubDataJsonLdFragment$key): PreactDOMAttributes['dangerouslySetInnerHTML'] {
  const data = useFragment(Fragment, query)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    author: {
      '@type': 'Person',
      name: data.name,
      additionalName: data.slug,
      description: getClubDescription(data.name),
      homeLocation: {
        '@type': 'Place',
        name: ''
      },
      ...(data?.thumbnail?.urls != null && {
        image: {
          '@type': 'ImageObject',
          contentUrl: data.thumbnail.urls[0].url,
          thumbnailUrl: data.thumbnail.urls[0].url
        }
      }),
      url: `https://www.overdoll.com/${data.slug}`
    }
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
