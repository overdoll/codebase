import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubFooterShareRedditButtonFragment$key } from '@//:artifacts/ClubFooterShareRedditButtonFragment.graphql'
import { t } from '@lingui/macro'
import ClubFooterButton from '../ClubFooterButton/ClubFooterButton'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useLingui } from '@lingui/react'
import { useRef } from 'react'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import { SocialReddit } from '@//:assets/logos'

interface Props {
  query: ClubFooterShareRedditButtonFragment$key
}

const Fragment = graphql`
  fragment ClubFooterShareRedditButtonFragment on Club {
    slug
    name
  }
`

export default function ClubFooterShareRedditButton ({ query }: Props): JSX.Element {
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
    title: StringParam
  }

  const redditPostData = {
    url: platformLink,
    title: `${data.name} is posting their free and high quality content on overdoll`
  }

  const encodedPost = `https://www.reddit.com/submit?${stringify(encodeQueryParams(configMap, { ...redditPostData }))}`

  const onOpenWindow = (): void => {
    windowReference.current = window.open(encodedPost, '_blank', 'width=600,height=800')
  }

  return (
    <ClubFooterButton
      colorScheme='red'
      isIcon
      onClick={onOpenWindow}
      icon={SocialReddit}
    >
      {i18n._(t`Share on Reddit`)}
    </ClubFooterButton>
  )
}
