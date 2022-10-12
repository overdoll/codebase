import { graphql, useFragment } from 'react-relay/hooks'
import type {
  SearchCategoryShareTwitterButtonFragment$key
} from '@//:artifacts/SearchCategoryShareTwitterButtonFragment.graphql'
import { t } from '@lingui/macro'
import SmallGenericButton from '@//:common/components/GenericButtons/SmallGenericButton/SmallGenericButton'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import useTwitterShare from '@//:modules/support/useTwitterShare'
import urlSlug, { TITLECASE_TRANSFORMER } from 'url-slug'

interface Props {
  query: SearchCategoryShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment SearchCategoryShareTwitterButtonFragment on Category {
    title
    slug
  }
`

export default function SearchCategoryShareTwitterButton ({ query }: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const transformTitleIntoHashtag = urlSlug(data.title, {
    separator: '',
    transformer: TITLECASE_TRANSFORMER
  })

  const onOpen = useTwitterShare({
    url: {
      pathname: '/search/category/[slug]',
      query: {
        slug: data.slug
      }
    },
    hashtags: ['R34', 'Rule34', 'NSFW', transformTitleIntoHashtag],
    text: `${data.title} NSFW videos and images on overdoll`,
    trackingEventId: '3HLCMZEV'
  })

  return (
    <SmallGenericButton
      colorScheme='twitter'
      onClick={onOpen}
      icon={SocialTwitter}
    >
      {i18n._(t`Share`)}
    </SmallGenericButton>
  )
}
