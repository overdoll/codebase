/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '../../components/PageLayout'

export default function Locked (): Node {
  return (
    <>
      <Helmet title='locked' />
      <PageWrapper>
        locked
      </PageWrapper>
    </>
  )
}
