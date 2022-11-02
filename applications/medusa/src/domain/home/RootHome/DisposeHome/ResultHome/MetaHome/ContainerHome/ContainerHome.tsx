import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerHomeFragment$key } from '@//:artifacts/ContainerHomeFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import BoxesHome from './BoxesHome/BoxesHome'
import UrlCurationProfile from './UrlCurationProfile/UrlCurationProfile'
import useFeatureFlag from '@//:modules/hooks/useFeatureFlag'
import SuggestedHome from './SuggestedHome/SuggestedHome'

interface Props {
  rootQuery: ContainerHomeFragment$key
}

const Fragment = graphql`
  fragment ContainerHomeFragment on Query {
    ...SuggestedHomeFragment
    viewer {
      ...BoxesHomeFragment
      ...UrlCurationProfileFragment
    }
  }
`

export default function ContainerHome (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  const flag = useFeatureFlag('home-suggested')

  return (
    <ContentContainer pt={2}>
      {flag === 'suggested' &&
        <SuggestedHome rootQuery={data} />}
      <BoxesHome viewerQuery={data.viewer} />
      <UrlCurationProfile viewerQuery={data.viewer} />
    </ContentContainer>
  )
}
