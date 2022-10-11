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

  const invalidateAuthenticationToken = (store, authenticationTokenId): void => {
    // TODO this is not working for some reason. the token doesn't get invalidated or deleted from the store
    store.get(authenticationTokenId)?.invalidateRecord()
    store.delete(authenticationTokenId)
  }

  const successfulGrant: SuccessfulGrantType = (store, viewerPayload, revokedAuthenticationToken) => {
    setViewer(store, viewerPayload)
    void router.push(redirect != null ? redirect : '/feed').then(() => {
      removeCookie('token')
      invalidateAuthenticationToken(store, revokedAuthenticationToken)
    })
  }

  const invalidateGrant: InvalidateGrantType = (store, invalidatedAuthenticationToken) => {
    invalidateToken(store)
    removeCookie('token')
    invalidateAuthenticationToken(store, invalidatedAuthenticationToken)
  }

  return {
    successfulGrant,
    invalidateGrant
  }
}
