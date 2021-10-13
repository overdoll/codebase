/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '../../components/PageLayout'

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
