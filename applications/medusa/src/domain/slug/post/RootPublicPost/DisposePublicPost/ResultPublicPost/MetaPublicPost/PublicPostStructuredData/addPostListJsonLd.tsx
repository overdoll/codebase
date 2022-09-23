import { graphql, useFragment } from 'react-relay/hooks'
import type { addPostListJsonLdFragment$key } from '@//:artifacts/addPostListJsonLdFragment.graphql'
import { getPostTitle } from '@//:modules/support/metaHelpers'
import { DOMAttributes } from 'react'

const Fragment = graphql`
  fragment addPostListJsonLdFragment on Post {
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

export default function addPostListJsonLd (query: addPostListJsonLdFragment$key): DOMAttributes<string>['dangerouslySetInnerHTML'] {
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
        '@id': `https://www.overdoll.com/${data.club.slug}/post/${data.reference}`,
        name: getPostTitle(characters, data.club.name)
      }
    }]
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
