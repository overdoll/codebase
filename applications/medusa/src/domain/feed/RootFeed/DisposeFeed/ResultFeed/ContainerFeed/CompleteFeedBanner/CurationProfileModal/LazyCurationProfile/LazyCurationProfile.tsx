import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { LazyCurationProfileQuery } from '@//:artifacts/LazyCurationProfileQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import PrepareCurationProfile
  from '@//:modules/content/HookedComponents/Filters/fragments/PrepareCurationProfile/PrepareCurationProfile'

interface Props extends ComponentSearchArguments<{}> {
  onClose?: () => void
}

const Query = graphql`
  query LazyCurationProfileQuery {
    viewer {
      ...PrepareCurationProfileFragment
    }
    ...PrepareCurationProfileRootFragment
  }
`

export default function LazyCurationProfile (props: Props): JSX.Element {
  const {
    searchArguments,
    onClose
  } = props

  const queryData = useLazyLoadQuery<LazyCurationProfileQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  if (queryData.viewer == null) return <></>

  return (
    <PrepareCurationProfile
      onClose={onClose}
      accountQuery={queryData.viewer}
      rootQuery={queryData}
    />
  )
}
