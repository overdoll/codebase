import { ReactNode } from 'react'
import Error from 'next/error'

interface Props {
  children: ReactNode
}

export default function NotFound ({ children }: Props): JSX.Element {
  /*
  const router = useRoutingContext()

  // this will only run on the server
  if (router.staticContext != null) {
    router.staticContext.status = 404
  }

   */

  return (
    <>
      <Error statusCode={404}>
        {children}
      </Error>
    </>
  )
}
