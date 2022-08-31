import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubFooterShareRedditButtonFragment$key } from '@//:artifacts/ClubFooterShareRedditButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import useRedditShare from '@//:modules/support/useRedditShare'

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

  const onOpen = useRedditShare({
    url: {
      pathname: '/[slug]',
      query: {
        slug: data.slug
      }
    },
    title: `${data.name} is posting their free and high quality content on overdoll`
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
