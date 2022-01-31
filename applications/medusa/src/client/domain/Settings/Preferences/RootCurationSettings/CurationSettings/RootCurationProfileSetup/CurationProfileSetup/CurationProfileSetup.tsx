import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { CurationProfileSetupQuery } from '@//:artifacts/CurationProfileSetupQuery.graphql'

interface Props {
  query: PreloadedQuery<CurationProfileSetupQuery>
}

const Query = graphql`
  query CurationProfileSetupQuery {
    viewer {
      curationProfile {
        id
        completed
      }
    }
  }
`

export default function CurationProfileSetup (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<CurationProfileSetupQuery>(
    Query,
    props.query
  )

  return (
    <>
    </>
  )
}
