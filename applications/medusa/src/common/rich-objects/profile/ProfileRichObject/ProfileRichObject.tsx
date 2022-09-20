import Head from 'next/head'
import React from 'react'
import { ProfileRichObjectFragment$key } from '@//:artifacts/ProfileRichObjectFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'
import ImageRichObject from '../../default/ImageRichObject/ImageRichObject'

interface Props {
  accountQuery: ProfileRichObjectFragment$key
}

const Fragment = graphql`
  fragment ProfileRichObjectFragment on Account {
    username
  }
`

export default function ProfileRichObject ({ accountQuery }: Props): JSX.Element {
  const data = useFragment(Fragment, accountQuery)

  const TITLE = `${data.username}'s Profile - overdoll`

  const DESCRIPTION = `See ${data.username}'s Profile on overdoll`

  const URL = `https://overdoll.com/profile/${data.username}`

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          property='og:url'
          key='og:url'
          content={URL}
        />
        <meta
          property='og:title'
          content={TITLE}
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
