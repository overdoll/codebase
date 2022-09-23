import { DOMAttributes } from 'react'

export default function addItemListJsonLd (): DOMAttributes<string>['dangerouslySetInnerHTML'] {
  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'ItemList',
    itemListElement: []
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
