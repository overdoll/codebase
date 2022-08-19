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
import { PostShareRedditButtonFragment$key } from '@//:artifacts/PostShareRedditButtonFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { getCharacterNames } from '@//:common/rich-objects/slug/PublicPostRichObject/PublicPostRichObject'

interface Props {
  query: PostShareRedditButtonFragment$key
}

const Fragment = graphql`
  fragment PostShareRedditButtonFragment on Post {
    reference
    club {
      name
      slug
    }
    characters {
      name
    }
  }
`

export default function PostShareRedditButton ({
  query
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const router = useRouter()

  const windowReference = useRef<Window | null>(null)

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: data.club.slug,
      reference: data.reference
    }
  }, true)

  const platformLink = `https://overdoll.com${resolved}`

  const configMap = {
    url: StringParam,
    title: StringParam
  }

  const redditPostData = {
    url: platformLink,
    title: `${getCharacterNames(data.characters.map((item) => item.name))} by ${data.club.name as string} on overdoll.com`
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
