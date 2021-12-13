import { Redirect } from 'react-router'
import { useLocation } from '@//:modules/routing'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Moderation ({ children }: Props): JSX.Element {
  const location = useLocation()

  return (
    <>
      {location.pathname === '/moderation' ? <Redirect to='/moderation/queue' /> : children}
    </>
  )
}
