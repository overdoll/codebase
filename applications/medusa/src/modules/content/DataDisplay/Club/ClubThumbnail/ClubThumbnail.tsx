import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubThumbnailFragment$key } from '@//:artifacts/ClubThumbnailFragment.graphql'
import { ResourceIcon } from '@//:modules/content/PageLayout'
import { FlexProps } from '@chakra-ui/react'

interface Props extends FlexProps {
  query: ClubThumbnailFragment$key
}

const Fragment = graphql`
  fragment ClubThumbnailFragment on Club {
    id
    thumbnail {
      ...ResourceIconFragment
    }
  }
`

export default function ClubThumbnail ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <ResourceIcon
      borderRadius='20%'
      showBorder
      seed={data.id}
      query={data.thumbnail}
      {...rest}
    />
  )
}
