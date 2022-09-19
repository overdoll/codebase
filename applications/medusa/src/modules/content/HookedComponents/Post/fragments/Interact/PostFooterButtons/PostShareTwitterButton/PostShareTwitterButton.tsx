import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import { PostShareTwitterButtonFragment$key } from '@//:artifacts/PostShareTwitterButtonFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { getCharacterNames } from '../../../../../../../support/metaHelpers'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import useTwitterShare from '../../../../../../../support/useTwitterShare'
import urlSlug, { TITLECASE_TRANSFORMER } from 'url-slug'

interface Props {
  query: PostShareTwitterButtonFragment$key
}

const Fragment = graphql`
  fragment PostShareTwitterButtonFragment on Post {
    reference
    club {
      name
      slug
    }
    characters {
      name
      club {
        __typename
      }
    }
    categories {
      title
    }
  }
`

export default function PostShareTwitterButton ({
  query
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const data = useFragment(Fragment, query)

  const hasOriginal = data.characters.map((item) => item.club != null).some((item) => item)

  const getHashtags = (): string[] => {
    const initialHashtags = ['NSFW']

    const getPostCategories = data.categories.map((item) => urlSlug((item.title), {
      separator: '',
      transformer: TITLECASE_TRANSFORMER
    })).slice(0, 5)

    return [...initialHashtags, ...getPostCategories]
  }

  const onOpen = useTwitterShare({
    url: {
      pathname: '/[slug]/post/[reference]',
      query: {
        slug: data.club.slug,
        reference: data.reference
      }
    },
    hashtags: getHashtags(),
    text: `${getCharacterNames((data.characters.map((item) => item.name).slice(0, 2)))}${hasOriginal ? ' (OC) ' : ' '}by ${data.club.name}`,
    trackingEventId: '3HLCMZEV'
  })

  return (
    <MediumGenericButton colorScheme='twitter' isIcon onClick={onOpen} icon={SocialTwitter}>
      {i18n._(t`Share on Twitter`)}
    </MediumGenericButton>
  )
}
