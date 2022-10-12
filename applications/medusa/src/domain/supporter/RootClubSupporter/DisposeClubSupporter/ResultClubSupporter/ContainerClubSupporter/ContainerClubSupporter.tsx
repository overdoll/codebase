import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerClubSupporterFragment$key } from '@//:artifacts/ContainerClubSupporterFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import HeaderClubSupporter from './HeaderClubSupporter/HeaderClubSupporter'
import FeaturesClubSupporter from './FeaturesClubSupporter/FeaturesClubSupporter'

interface Props {
  rootQuery: ContainerClubSupporterFragment$key
}

const RootFragment = graphql`
  fragment ContainerClubSupporterFragment on Query {
    ...HeaderClubSupporterFragment
  }
`

export default function ContainerClubSupporter (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <ContentContainer>
      <HeaderClubSupporter rootQuery={rootData} />
      <FeaturesClubSupporter />
    </ContentContainer>
  )
}
