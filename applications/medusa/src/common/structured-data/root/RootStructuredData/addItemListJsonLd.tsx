import { PreactDOMAttributes } from 'preact'

export default function addItemListJsonLd (): PreactDOMAttributes['dangerouslySetInnerHTML'] {
  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'ItemList',
    itemListElement: []
  }

  return {
    __html: JSON.stringify(schemaData)
  }
}
