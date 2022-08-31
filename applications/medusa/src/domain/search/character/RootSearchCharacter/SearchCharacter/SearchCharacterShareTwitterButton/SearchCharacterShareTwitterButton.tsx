import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCharacterShareTwitterButtonFragment$key
} from '@//:artifacts/SearchCharacterShareTwitterButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import useTwitterShare from '@//:modules/support/useTwitterShare'
import urlSlug, { TITLECASE_TRANSFORMER } from 'url-slug'

interface Props {
  query: SearchCharacterShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCharacterShareTwitterButtonFragment on Character {
    name
    series @required(action: THROW) {
      title
      slug
    }
    slug
  }
`

export default function SearchCharacterShareTwitterButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const transformNameIntoHashtag = urlSlug(data.name, {
    separator: '',
    transformer: TITLECASE_TRANSFORMER
  })

  const transformSeriesIntoHashtag = urlSlug(data.series.title, {
    separator: '',
    transformer: TITLECASE_TRANSFORMER
  })

  const onOpen = useTwitterShare({
    url: {
      pathname: '/search/character/[seriesSlug]/[characterSlug]',
      query: {
        characterSlug: data.slug,
        seriesSlug: data.series.slug
      }
    },
    hashtags: ['R34', 'Rule34', 'NSFW', transformNameIntoHashtag, transformSeriesIntoHashtag],
    text: `${data.name} NSFW videos and images on overdoll`
  })

  return (
    <SmallGenericButton
      colorScheme='twitter'
      isIcon
      onClick={onOpen}
      icon={SocialTwitter}
    >
      {i18n._(t`Share on Twitter`)}
    </SmallGenericButton>
  )
}
