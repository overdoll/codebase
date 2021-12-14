import type { ReactNode } from 'react'
import { useLocation } from '@//:modules/routing'
import { Redirect } from 'react-router'

interface Props {
  children: ReactNode
}

export default function Settings ({ children }: Props): JSX.Element {
  const location = useLocation()

  return (
    <>
      {location.pathname === '/settings' ? <Redirect to='/settings/profile' /> : children}
    </>
  )
}
