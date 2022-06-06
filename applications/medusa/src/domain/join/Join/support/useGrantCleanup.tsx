import { StringParam, useQueryParam } from 'use-query-params'
import { invalidateToken, setViewer } from './support'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

type SuccessfulGrantType = (store, viewerPayload, revokedAuthenticationToken) => void
type InvalidateGrantType = (store, invalidatedAuthenticationToken) => void

interface UseGrantCleanupReturn {
  successfulGrant: SuccessfulGrantType
  invalidateGrant: InvalidateGrantType
}

export default function useGrantCleanup (): UseGrantCleanupReturn {
  const [redirect] = useQueryParam<string | null | undefined>('redirect', StringParam)

  const router = useRouter()

  const [, , removeCookie] = useCookies<string>(['token'])

  const successfulGrant: SuccessfulGrantType = (store, viewerPayload, revokedAuthenticationToken) => {
    setViewer(store, viewerPayload)
    void router.push(redirect != null ? redirect : '/').then(() => {
      removeCookie('token')
      if (revokedAuthenticationToken != null) {
        store.get(revokedAuthenticationToken)?.invalidateRecord()
      }
    })
  }

  const invalidateGrant: InvalidateGrantType = (store, invalidatedAuthenticationToken) => {
    invalidateToken(store)
    removeCookie('token')
    if (invalidatedAuthenticationToken != null) {
      store.get(invalidatedAuthenticationToken)?.invalidateRecord()
    }
  }

  return {
    successfulGrant,
    invalidateGrant
  }
}
