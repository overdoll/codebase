/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '../../components/PageLayout'

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
