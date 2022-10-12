import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCategoryShareRedditButtonFragment$key
} from '@//:artifacts/SearchCategoryShareRedditButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import useRedditShare from '@//:modules/support/useRedditShare'

interface Props {
  query: SearchCategoryShareRedditButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCategoryShareRedditButtonFragment on Category {
    title
    slug
  }
`

export default function SearchCategoryShareRedditButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const onOpen = useRedditShare({
    url: {
      pathname: '/search/category/[slug]',
      query: {
        slug: data.slug
      }
    },
    title: `${data.title} Rule34 NSFW videos and images on overdoll`,
    trackingEventId: 'KYLM9WBY'
  })

  return (
    <SmallGenericButton
      colorScheme='red'
      onClick={onOpen}
      icon={SocialReddit}
    >
      {i18n._(t`Share`)}
    </SmallGenericButton>
  )
}
