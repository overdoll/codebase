/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'

export default function Queue (): Node {
  return (
    <>
      <Helmet title='queue' />
      queue
    </>
  )
}
