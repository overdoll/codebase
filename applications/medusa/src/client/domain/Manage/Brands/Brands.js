/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '../../../../modules/content/PageLayout'

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
