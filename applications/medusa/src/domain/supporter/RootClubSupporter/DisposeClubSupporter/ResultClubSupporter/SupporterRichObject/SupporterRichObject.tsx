import Head from 'next/head'
import React from 'react'

export default function SupporterRichObject (): JSX.Element {
  const TITLE = 'overdoll - Become a Supporter'
  const DESCRIPTION = 'Become a club supporter on overdoll and get access to exclusive content as well as platform-wide features'

  const URL = 'https://overdoll.com/supporter'

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          name='og:title'
          content={TITLE}
        />
        <meta
          name='description'
          content={DESCRIPTION}
        />
        <meta
          name='og:description'
          content={DESCRIPTION}
        />
        <link
          rel='canonical'
          href={URL}
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:type' content='image' />
        <meta property='og:image' content='https://static.dollycdn.net/creators/banners/large.jpg' />
        <meta property='og:image:secure_url' content='https://static.dollycdn.net/creators/banners/large.jpg' />
        <meta property='og:image:type' content='image/jpeg' />
        <meta property='og:image:width' content='2048px' />
        <meta property='og:image:height' content='1086px' />
      </Head>
    </>
  )
}
