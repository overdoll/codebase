/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'

export default function History (): Node {
  return (
    <>
      <Helmet title='history' />
      history
    </>
  )
}
