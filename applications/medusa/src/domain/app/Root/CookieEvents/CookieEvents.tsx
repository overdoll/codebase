import { useEffect, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'

export default function CookieEvents (): JSX.Element {
  const time = `${Date.now()}`

  const [cookies, setCookie] = useCookies<string>(['postSeed'])

  const memoized = useMemo(() => new Random(hash(time)), [time])

  useEffect(() => {
    if (cookies.postSeed == null) {
      setCookie('postSeed', `${memoized.nextInt31()}`, {
        path: '/',
        secure: true,
        sameSite: 'lax'
      })
    }
  }, [])

  return <></>
}
