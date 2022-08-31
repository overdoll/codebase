import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCustomCharacterShareRedditButtonFragment$key
} from '@//:artifacts/SearchCustomCharacterShareRedditButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import useRedditShare from '@//:modules/support/useRedditShare'

interface Props {
  query: SearchCustomCharacterShareRedditButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCustomCharacterShareRedditButtonFragment on Character {
    name
    slug
    club @required(action: THROW) {
      name
      slug
    }
  }
`

export default function SearchCustomCharacterShareRedditButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const onOpen = useRedditShare({
    url: {
      pathname: '/[slug]/character/[characterSlug]',
      query: {
        characterSlug: data.slug,
        slug: data.club.slug
      }
    },
    title: `${data.name} (${data.club.name}) (OC) Rule34 NSFW videos and images on overdoll`
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
