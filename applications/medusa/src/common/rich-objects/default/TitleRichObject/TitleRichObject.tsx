import Head from 'next/head'
import React from 'react'
import { TITLE_FEATURES } from '@//:modules/constants/rich-objects'

export const TITLE = `overdoll - ${TITLE_FEATURES}`

export default function TitleRichObject (): JSX.Element {
  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          property='og:title'
          content={TITLE}
        />
      </Head>
    </>
  )
}
