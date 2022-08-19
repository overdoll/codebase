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
import { PostShareTwitterButtonFragment$key } from '@//:artifacts/PostShareTwitterButtonFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { getCharacterNames } from '@//:common/rich-objects/slug/PublicPostRichObject/PublicPostRichObject'

interface Props {
  query: PostShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment PostShareTwitterButtonFragment on Post {
    reference
    club {
      name
      slug
    }
    characters {
      name
    }
    categories {
      title
    }
  }
`

export default function PostShareTwitterButton ({
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
    hashtags: StringParam,
    via: StringParam,
    text: StringParam
  }

  const getHashtags = (): string => {
    const initialHashtags = ['NSFW']

    const getPostCategories = data.categories.map((item) => (item.title)).slice(0, 5)

    return [...initialHashtags, ...getPostCategories].join(',')
  }

  const tweetData = {
    url: platformLink,
    hashtags: getHashtags(),
    via: 'overdoll_com',
    text: `${getCharacterNames((data.characters.map((item) => item.name).slice(0, 2)))} by ${data.club.name as string}`
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
