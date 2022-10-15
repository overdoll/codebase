import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { CurationSettingsQuery as CurationSettingsQueryType } from '@//:artifacts/CurationSettingsQuery.graphql'
import PrepareCurationProfile
  from '@//:modules/content/HookedComponents/Filters/fragments/PrepareCurationProfile/PrepareCurationProfile'

interface Props {
  query: PreloadedQuery<CurationSettingsQueryType>
}

const Query = graphql`
  query CurationSettingsQuery {
    viewer @required(action: THROW) {
      ...PrepareCurationProfileFragment
    }
    ...PrepareCurationProfileRootFragment
  }
`

export default function CurationSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<CurationSettingsQueryType>(
    Query,
    props.query
  )

  return (
    <PrepareCurationProfile accountQuery={queryData.viewer} rootQuery={queryData} />
  )
}
