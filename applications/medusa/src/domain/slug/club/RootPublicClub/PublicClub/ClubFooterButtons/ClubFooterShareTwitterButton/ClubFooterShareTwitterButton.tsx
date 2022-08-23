import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ClubFooterShareTwitterButtonFragment$key
} from '@//:artifacts/ClubFooterShareTwitterButtonFragment.graphql'
import { t } from '@lingui/macro'
import ClubFooterButton from '../ClubFooterButton/ClubFooterButton'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useLingui } from '@lingui/react'
import { useRef } from 'react'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import { SocialTwitter } from '@//:assets/logos'

interface Props {
  query: ClubFooterShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment ClubFooterShareTwitterButtonFragment on Club {
    slug
    name
  }
`

export default function ClubFooterShareTwitterButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const windowReference = useRef<Window | null>(null)

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]',
    query: {
      slug: data.slug
    }
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
    text: `${data.name} is posting their free and high quality content on overdoll`
  }

  const encodedTweet = `https://twitter.com/intent/tweet?${stringify(encodeQueryParams(configMap, { ...tweetData }))}`

  const onOpenWindow = (): void => {
    windowReference.current = window.open(encodedTweet, '_blank', 'width=600,height=800')
  }

  return (
    <ClubFooterButton
      colorScheme='twitter'
      isIcon
      onClick={onOpenWindow}
      icon={SocialTwitter}
    >
      {i18n._(t`Share on Twitter`)}
    </ClubFooterButton>
  )
}
