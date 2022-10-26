import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubShareRedditButtonFragment$key } from '@//:artifacts/ClubShareRedditButtonFragment.graphql'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import useRedditShare from '@//:modules/support/useRedditShare'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'

interface Props {
  query: ClubShareRedditButtonFragment$key
}

const Fragment = graphql`
  fragment ClubShareRedditButtonFragment on Club {
    slug
    name
  }
`

export default function ClubShareRedditButton ({ query }: Props): JSX.Element {
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
    <MenuItem onClick={onOpen} text={i18n._(t`Share on Reddit`)} icon={SocialReddit} />
  )
}
