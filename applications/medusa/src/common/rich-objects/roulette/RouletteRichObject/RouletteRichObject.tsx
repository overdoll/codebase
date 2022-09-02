import Head from 'next/head'
import React from 'react'
import { TITLE_FEATURES } from '@//:modules/constants/rich-objects'

export default function RouletteRichObject (): JSX.Element {
  const TITLE = `Rule34 Roulette - Spin your way through ${TITLE_FEATURES}`

  const DESCRIPTION = 'Play the Rule34 Roulette on overdoll and see how long you can last before you have to lose!'

  const URL = 'https://overdoll.com/roulette'

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
        <meta
          name='description'
          content={DESCRIPTION}
        />
        <meta
          property='og:description'
          content={DESCRIPTION}
        />
        <meta
          property='og:image'
          content='https://static.dollycdn.net/banners/roulette-opengraph-thumbnail.jpg'
        />
        <meta property='og:image:type' content='image/jpeg' />
        <meta property='og:image:width' content='1827' />
        <meta property='og:image:height' content='1145' />
      </Head>
    </>
  )
}
