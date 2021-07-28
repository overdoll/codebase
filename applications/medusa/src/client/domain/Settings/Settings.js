/**
 * @flow
 */
import type { Node } from 'react'
import { useLocation } from '@//:modules/routing'
import { Redirect } from 'react-router'

type Props = {
  children: Node
}

export default function Settings ({ children }: Props): Node {
  const location = useLocation()

  return (
    <>
      {location.pathname === '/settings' ? <Redirect to='/settings/profile' /> : children}
    </>
  )
}
