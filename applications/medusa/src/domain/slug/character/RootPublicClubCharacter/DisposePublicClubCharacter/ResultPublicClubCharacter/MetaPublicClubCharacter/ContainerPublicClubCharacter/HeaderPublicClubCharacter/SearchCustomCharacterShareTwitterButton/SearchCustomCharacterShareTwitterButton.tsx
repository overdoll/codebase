import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCustomCharacterShareTwitterButtonFragment$key
} from '@//:artifacts/SearchCustomCharacterShareTwitterButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import useTwitterShare from '@//:modules/support/useTwitterShare'
import urlSlug, { TITLECASE_TRANSFORMER } from 'url-slug'

interface Props {
  query: SearchCustomCharacterShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCustomCharacterShareTwitterButtonFragment on Character {
    name
    slug
    club @required(action: THROW) {
      name
      slug
    }
  }
`

export default function SearchCustomCharacterShareTwitterButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const transformNameIntoHashtag = urlSlug(data.name, {
    separator: '',
    transformer: TITLECASE_TRANSFORMER
  })

  const onOpen = useTwitterShare({
    url: {
      pathname: '/[slug]/character/[characterSlug]',
      query: {
        characterSlug: data.slug,
        slug: data.club.slug
      }
    },
    hashtags: ['R34', 'Rule34', 'NSFW', transformNameIntoHashtag],
    text: `${data.name} (OC) NSFW videos and images on overdoll`,
    trackingEventId: '3HLCMZEV'
  })

  return (
    <SmallGenericButton
      colorScheme='twitter'
      onClick={onOpen}
      icon={SocialTwitter}
    >
      {i18n._(t`Share`)}
    </SmallGenericButton>
  )
}
