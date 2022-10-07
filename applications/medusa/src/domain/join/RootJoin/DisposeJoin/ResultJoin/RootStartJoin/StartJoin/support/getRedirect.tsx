import { StringParam, useQueryParam } from 'use-query-params'

type GetRedirectProps = string

export default function getRedirect (): GetRedirectProps {
  const [redirect] = useQueryParam<string | null | undefined>('redirect', StringParam)

  return redirect == null ? '/' : redirect
}
