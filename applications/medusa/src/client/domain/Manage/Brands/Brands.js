/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '../../../components/PageLayout'

export default function Brands (): Node {
  return (
    <>
      <Helmet title='brands' />
      <PageWrapper>
        brands
      </PageWrapper>
    </>
  )
}
