/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'

export default function Home (): Node {
  return (
    <>
      <Helmet title='home' />
      home
    </>
  )
}
