import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchSeriesShareRedditButtonFragment$key
} from '@//:artifacts/SearchSeriesShareRedditButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import useRedditShare from '@//:modules/support/useRedditShare'

interface Props {
  query: SearchSeriesShareRedditButtonFragment$key
}

const Fragment = graphql`
  fragment SearchSeriesShareRedditButtonFragment on Series {
    title
    slug
  }
`

export default function SearchSeriesShareRedditButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const onOpen = useRedditShare({
    url: {
      pathname: '/search/character/[seriesSlug]',
      query: {
        seriesSlug: data.slug
      }
    },
    title: `${data.title} Rule34 NSFW videos and images on overdoll`
  })

  return (
    <SmallGenericButton
      colorScheme='red'
      isIcon
      onClick={onOpen}
      icon={SocialReddit}
    >
      {i18n._(t`Share on Reddit`)}
    </SmallGenericButton>
  )
}
