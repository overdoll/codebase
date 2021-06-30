/**
 * @flow
 */
import { Redirect } from 'react-router'
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'

export default function Mod (): Node {
  return (
    <>
      <Helmet title='mod' />
    </>
  )
}
