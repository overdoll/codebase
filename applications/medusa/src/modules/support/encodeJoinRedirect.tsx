import { encodeQueryParams } from 'serialize-query-params'
import { StringParam } from 'use-query-params'
import { stringify } from 'query-string'

export default function encodeJoinRedirect (redirect: string): string {
  const encodedQuery = encodeQueryParams({ redirect: StringParam }, {
    redirect: redirect
  })

  return `/join?${stringify(encodedQuery)}`
}
