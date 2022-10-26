import { graphql, useFragment } from 'react-relay/hooks'
import type { addClubDataJsonLdFragment$key } from '@//:artifacts/addClubDataJsonLdFragment.graphql'
import { getClubDescription } from '../PublicClubRichObject/PublicClubRichObject'
import { DOMAttributes } from 'react'

const Fragment = graphql`
  fragment addClubDataJsonLdFragment on Club {
    name
    slug
  }
`

export default function addClubDataJsonLd (query: addClubDataJsonLdFragment$key): DOMAttributes<string>['dangerouslySetInnerHTML'] {
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
      url: `https://www.overdoll.com/${data.slug}`
    }
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
