import { PreactDOMAttributes } from 'preact'
import { graphql, useFragment } from 'react-relay/hooks'
import type { addPostJsonLdFragment$key } from '@//:artifacts/addPostJsonLdFragment.graphql'
import { getPostTitle } from '../../../rich-objects/slug/PublicPostRichObject/PublicPostRichObject'

const Fragment = graphql`
  fragment addPostJsonLdFragment on Post {
    reference
    club {
      slug
      name
    }
    characters {
      name
    }
  }
`

export default function addPostJsonLd (query: addPostJsonLdFragment$key): PreactDOMAttributes['dangerouslySetInnerHTML'] {
  const data = useFragment(Fragment, query)

  const characters = data.characters.map((item) => item.name)

  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [{
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Thing',
        '@id': 'https://www.overdoll.com',
        name: 'overdoll'
      }
    }, {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Thing',
        '@id': `https://www.overdoll.com/${data.club.slug}`,
        name: `${data.club.name} - overdoll`
      }
    }, {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Thing',
        '@id': `/${data.club.slug}/post/${data.reference}`,
        name: getPostTitle(characters, data.club.name)
      }
    }]
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
