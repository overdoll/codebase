import { graphql } from 'react-relay'
import { ClubHeaderMediaFragment$key } from '@//:artifacts/ClubHeaderMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import HeaderImageMedia from '../../../../Media/fragments/Media/HeaderImageMedia/HeaderImageMedia'

const Fragment = graphql`
  fragment ClubHeaderMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...HeaderImageMediaFragment
    }
    ...on VideoMedia {
      cover {
        ...HeaderImageMediaFragment
      }
    }
  }
`

interface Props {
  mediaQuery: ClubHeaderMediaFragment$key
}

export default function ClubHeaderMedia (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data.__typename === 'ImageMedia') {
    return (
      <HeaderImageMedia imageMediaQuery={data} />
    )
  }

  if (data.__typename === 'VideoMedia') {
    return (
      <HeaderImageMedia imageMediaQuery={data.cover} />
    )
  }

  return <></>
}
