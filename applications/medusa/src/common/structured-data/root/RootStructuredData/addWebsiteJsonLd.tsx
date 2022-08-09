import { TITLE } from '../../../rich-objects/default/TitleRichObject/TitleRichObject'
import { DESCRIPTION } from '../../../rich-objects/default/DefaultRichObject/DefaultRichObject'
import { DOMAttributes } from 'react'

export default function addWebsiteJsonLd (): DOMAttributes<string>['dangerouslySetInnerHTML'] {
  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    '@id': 'https://www.overdoll.com/#website',
    url: 'https://www.overdoll.com/',
    name: TITLE,
    description: DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.overdoll.com/#organization',
      name: 'overdoll',
      url: 'https://www.overdoll.com/',
      sameAs: ['https://www.corpodoll.com/', 'https://twitter.com/overdoll_com'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://static.dollycdn.net/manifest/android-chrome-192x192.png'
      }
    },
    potentialAction: [{
      '@type': 'SearchAction',
      target: 'https://overdoll.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
    ]
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
