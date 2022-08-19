import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import PostFooterButton
  from '@//:modules/content/Posts/components/PostInteraction/PostFooterButtons/PostFooterButton/PostFooterButton'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import { useRef } from 'react'

export default function PlatformShareTwitterButton (): JSX.Element {
  const { i18n } = useLingui()

  const router = useRouter()

  const windowReference = useRef<Window | null>(null)

  const [, resolved] = resolveHref(router, {
    pathname: '/artists'
  }, true)

  const platformLink = `https://overdoll.com${resolved}`

  const configMap = {
    url: StringParam,
    hashtags: StringParam,
    via: StringParam,
    text: StringParam
  }

  const tweetData = {
    url: platformLink,
    hashtags: 'R34,Rule34,hentai,furry,NSFW,3D',
    via: 'overdoll_com',
    text: 'overdoll is a platform built for the adult content artist (you!) to create a new experience for your fans when sharing your content!'
  }

  const encodedTweet = `https://twitter.com/intent/tweet?${stringify(encodeQueryParams(configMap, { ...tweetData }))}`

  const onOpenWindow = (): void => {
    windowReference.current = window.open(encodedTweet, '_blank', 'width=600,height=800')
  }

  return (
    <PostFooterButton colorScheme='twitter' isIcon onClick={onOpenWindow} icon={SocialTwitter}>
      {i18n._(t`Share on Twitter`)}
    </PostFooterButton>
  )
}
