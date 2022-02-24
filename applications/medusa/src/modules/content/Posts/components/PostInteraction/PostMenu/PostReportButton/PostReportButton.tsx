import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostReportButtonFragment$key } from '@//:artifacts/PostReportButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { MenuItem } from '../../../../../ThemeComponents/Menu/Menu'
import { FlagReport } from '@//:assets/icons'

interface Props {
  query: PostReportButtonFragment$key
}

const Fragment = graphql`
  fragment PostReportButtonFragment on Post {
    reference @required(action: THROW)
  }
`

export default function PostReportButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <MenuItem text={<Trans>Report Post</Trans>} icon={FlagReport} />
  )
}
