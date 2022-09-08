import { useRouter } from 'next/router'
import { useRef } from 'react'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import { UrlObject } from 'url'
import trackFathomEvent from './trackFathomEvent'

interface UseTwitterShareProps {
  url: string | UrlObject
  hashtags: string[]
  text: string
  trackingEventId?: string
}

type UseTwitterShareReturn = () => void

export default function useTwitterShare (props: UseTwitterShareProps): UseTwitterShareReturn {
  const {
    url,
    hashtags,
    text,
    trackingEventId
  } = props

  const router = useRouter()

  const windowReference = useRef<Window | null>(null)

  const [, resolved] = resolveHref(router, url, true)

  const platformLink = `https://overdoll.com${resolved}`

  const defaultHashtags = [...hashtags, 'overdoll']

  const configMap = {
    url: StringParam,
    hashtags: StringParam,
    via: StringParam,
    text: StringParam
  }

  const tweetData = {
    url: platformLink,
    hashtags: defaultHashtags.join(','),
    via: 'overdoll_com',
    text: text
  }

  const encodedTweet = `https://twitter.com/intent/tweet?${stringify(encodeQueryParams(configMap, { ...tweetData }))}`

  return (): void => {
    windowReference.current = window.open(encodedTweet, '_blank', 'width=600,height=800')
    if (trackingEventId != null) {
      trackFathomEvent(trackingEventId, 1)
    }
  }
}
