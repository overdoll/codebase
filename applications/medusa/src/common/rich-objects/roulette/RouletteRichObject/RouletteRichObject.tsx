import Head from 'next/head'
import React from 'react'
import { TITLE_FEATURES } from '@//:modules/constants/rich-objects'
import ImageRichObject from '../../default/ImageRichObject/ImageRichObject'

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
      </Head>
      <ImageRichObject />
    </>
  )
}
