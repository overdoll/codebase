import { encodeQueryParams } from 'serialize-query-params'
import { StringParam } from 'use-query-params'
import { stringify } from 'query-string'
import { UrlObject } from 'url'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'

export default function encodeJoinRedirect (href: string | UrlObject, from?: string): string {
  const router = useRouter()

  const [, resolved] = resolveHref(router, href, true)

  const encodedQuery = encodeQueryParams({
    redirect: StringParam,
    from: StringParam
  }, {
    redirect: resolved,
    from: from
  })

  return `/join?${stringify(encodedQuery)}`
}
