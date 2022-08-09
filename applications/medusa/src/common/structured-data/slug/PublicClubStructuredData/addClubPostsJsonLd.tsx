import { graphql, useFragment } from 'react-relay/hooks'
import type { addClubPostsJsonLdFragment$key } from '@//:artifacts/addClubPostsJsonLdFragment.graphql'
import { DOMAttributes } from 'react'

const Fragment = graphql`
  fragment addClubPostsJsonLdFragment on Club {
    name
    slug
  }
`

export default function addClubPostsJsonLd (query: addClubPostsJsonLdFragment$key): DOMAttributes<string>['dangerouslySetInnerHTML'] {
  const data = useFragment(Fragment, query)

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
        '@id': `https://www.overdoll.com/${data.slug}`,
        name: `${data.name} - overdoll`
      }
    }]
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
