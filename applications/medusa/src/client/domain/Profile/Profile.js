/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'

export default function Profile (): Node {
  return (
    <>
      <Helmet title='profile' />
      <PageWrapper>
        profile
      </PageWrapper>
    </>
  )
}
