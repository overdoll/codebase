import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchSeriesShareTwitterButtonFragment$key
} from '@//:artifacts/SearchSeriesShareTwitterButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import useTwitterShare from '@//:modules/support/useTwitterShare'
import urlSlug, { TITLECASE_TRANSFORMER } from 'url-slug'

interface Props {
  query: SearchSeriesShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment SearchSeriesShareTwitterButtonFragment on Series {
    title
    slug
  }
`

export default function SearchSeriesShareTwitterButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const transformSeriesIntoHashtag = urlSlug(data.title, {
    separator: '',
    transformer: TITLECASE_TRANSFORMER
  })

  const onOpen = useTwitterShare({
    url: {
      pathname: '/search/character/[seriesSlug]',
      query: {
        seriesSlug: data.slug
      }
    },
    hashtags: ['R34', 'Rule34', 'NSFW', transformSeriesIntoHashtag],
    text: `${data.title} NSFW videos and images on overdoll`,
    trackingEventId: '3HLCMZEV'
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
