import Head from 'next/head'
import React from 'react'
import { TITLE_FEATURES } from '@//:modules/constants/rich-objects'
import DefaultRichObject from '@//:common/rich-objects/default/DefaultRichObject/DefaultRichObject'

export default function TopRichObject (): JSX.Element {
  const TITLE = `Top ${TITLE_FEATURES} on overdoll`

  const URL = 'https://overdoll.com/top'

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          name='og:title'
          content={TITLE}
        />
        <link
          rel='canonical'
          href={URL}
        />
      </Head>
      <DefaultRichObject />
    </>
  )
}
