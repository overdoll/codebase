import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ClubFooterShareTwitterButtonFragment$key
} from '@//:artifacts/ClubFooterShareTwitterButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import useTwitterShare from '@//:modules/support/useTwitterShare'

interface Props {
  query: ClubFooterShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment ClubFooterShareTwitterButtonFragment on Club {
    slug
    name
  }
`

export default function ClubFooterShareTwitterButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const onOpen = useTwitterShare({
    url: {
      pathname: '/[slug]',
      query: {
        slug: data.slug
      }
    },
    hashtags: ['R34', 'Rule34', 'hentai', 'furry', 'NSFW', '3D'],
    text: `${data.name} is posting their free and high quality content on overdoll`,
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
