import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import PostFooterButton
  from '@//:modules/content/Posts/components/PostInteraction/PostFooterButtons/PostFooterButton/PostFooterButton'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import { useRef } from 'react'

export default function PlatformShareRedditButton (): JSX.Element {
  const { i18n } = useLingui()

  const router = useRouter()

  const windowReference = useRef<Window | null>(null)

  const [, resolved] = resolveHref(router, {
    pathname: '/artists'
  }, true)

  const platformLink = `https://overdoll.com${resolved}`

  const configMap = {
    url: StringParam,
    title: StringParam
  }

  const redditPostData = {
    url: platformLink,
    title: 'overdoll is a new platform built for Rule34, NSFW, Hentai, Furry artists'
  }

  const encodedPost = `https://www.reddit.com/submit?${stringify(encodeQueryParams(configMap, { ...redditPostData }))}`

  const onOpenWindow = (): void => {
    windowReference.current = window.open(encodedPost, '_blank', 'width=600,height=800')
  }

  return (
    <PostFooterButton colorScheme='red' isIcon onClick={onOpenWindow} icon={SocialReddit}>
      {i18n._(t`Share on Reddit`)}
    </PostFooterButton>
  )
}
