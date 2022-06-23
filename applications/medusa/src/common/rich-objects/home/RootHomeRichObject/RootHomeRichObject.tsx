import Head from 'next/head'
import React from 'react'
import { TITLE_FEATURES } from '@//:modules/constants/rich-objects'

export default function RootHomeRichObject (): JSX.Element {
  const TITLE = `overdoll.com - ${TITLE_FEATURES}`

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <meta
        name='og:title'
        key='og:title'
        content={TITLE}
      />
    </>
  )
}