/**
 * @flow
 */
import type { Node } from 'react';
import { Redirect } from 'react-router';
import { useLocation } from '@//:modules/routing';

type Props = {
  children: Node
}

export default function Manage ({ children }: Props): Node {
  const location = useLocation()

  return (
    <>
      {location.pathname === '/manage' ? <Redirect to='/manage/posts' /> : children}
    </>
  )
}
