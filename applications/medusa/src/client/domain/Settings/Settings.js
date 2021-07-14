/**
 * @flow
 */
import type { Node } from 'react'
import { useLocation } from '@//:modules/routing'
import { Redirect } from 'react-router'

export default function Settings ({ children }): Node {
  const location = useLocation()

  return (
    <>
      {location.pathname === '/s' ? <Redirect to='/s/profile' /> : children}
    </>
  )
}
