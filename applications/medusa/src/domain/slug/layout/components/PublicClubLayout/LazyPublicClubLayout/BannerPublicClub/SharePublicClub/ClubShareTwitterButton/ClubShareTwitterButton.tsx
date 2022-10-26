import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubShareTwitterButtonFragment$key } from '@//:artifacts/ClubShareTwitterButtonFragment.graphql'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import useTwitterShare from '@//:modules/support/useTwitterShare'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'

interface Props {
  query: ClubShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment ClubShareTwitterButtonFragment on Club {
    slug
    name
  }
`

export default function ClubShareTwitterButton ({ query }: Props): JSX.Element {
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
    text: `${data.name} is posting their free and high quality content on overdoll`
  })

  return (
    <MenuItem onClick={onOpen} text={i18n._(t`Share on Twitter`)} icon={SocialTwitter} />
  )
}
