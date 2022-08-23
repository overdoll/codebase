import { useRouter } from 'next/router'
import { useRef } from 'react'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import { UrlObject } from 'url'

interface UseRedditShareProps {
  url: string | UrlObject
  title: string
}

type UseRedditShareReturn = () => void

export default function useRedditShare (props: UseRedditShareProps): UseRedditShareReturn {
  const {
    url,
    title
  } = props

  const router = useRouter()

  const windowReference = useRef<Window | null>(null)

  const [, resolved] = resolveHref(router, url, true)

  const platformLink = `https://overdoll.com${resolved}`

  const configMap = {
    url: StringParam,
    title: StringParam
  }

  const redditPostData = {
    url: platformLink,
    title: title
  }

  const encodedPost = `https://www.reddit.com/submit?${stringify(encodeQueryParams(configMap, { ...redditPostData }))}`

  return (): void => {
    windowReference.current = window.open(encodedPost, '_blank', 'width=600,height=800')
  }
}
