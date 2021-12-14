/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'

export default function Home (): Node {
  return (
    <>
      <Helmet title='home' />
      <PageWrapper>
        home
      </PageWrapper>
    </>
  )
}
