import Head from 'next/head'
import React from 'react'
import { TITLE_FEATURES } from '@//:modules/constants/rich-objects'
import DefaultRichObject from '../../default/DefaultRichObject/DefaultRichObject'

export default function RootHomeRichObject (): JSX.Element {
  const TITLE = `overdoll - ${TITLE_FEATURES}`

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          name='og:title'
          content={TITLE}
        />
      </Head>
      <DefaultRichObject />
    </>

  )
}
