import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import { PostShareRedditButtonFragment$key } from '@//:artifacts/PostShareRedditButtonFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { getCharacterNames } from '@//:modules/support/metaHelpers'
import useRedditShare from '@//:modules/support/useRedditShare'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'

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
      club {
        __typename
      }
    }
  }
`

export default function PostShareRedditButton ({
  query
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const hasOriginal = data.characters.map((item) => item.club != null).some((item) => item)

  const onOpen = useRedditShare({
    url: {
      pathname: '/[slug]/post/[reference]',
      query: {
        slug: data.club.slug,
        reference: data.reference
      }
    },
    title: `${getCharacterNames(data.characters.map((item) => item.name))}${hasOriginal ? ' (OC) ' : ' '}by ${data.club.name}`,
    trackingEventId: 'KYLM9WBY'
  })

  return (
    <SmallGenericButton colorScheme='red' onClick={onOpen} icon={SocialReddit}>
      {i18n._(t`Repost`)}
    </SmallGenericButton>
  )
}
