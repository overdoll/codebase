import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCharacterShareRedditButtonFragment$key
} from '@//:artifacts/SearchCharacterShareRedditButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import useRedditShare from '@//:modules/support/useRedditShare'

interface Props {
  query: SearchCharacterShareRedditButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCharacterShareRedditButtonFragment on Character {
    name
    slug
    series @required(action: THROW) {
      title
      slug
    }
  }
`

export default function SearchCharacterShareRedditButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const onOpen = useRedditShare({
    url: {
      pathname: '/search/character/[seriesSlug]/[characterSlug]',
      query: {
        characterSlug: data.slug,
        seriesSlug: data.series.slug
      }
    },
    title: `${data.name} (${data.series.title}) Rule34 NSFW videos and images on overdoll`,
    trackingEventId: 'KYLM9WBY'
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
