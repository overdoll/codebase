import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubTransferOwnershipFragment$key } from '@//:artifacts/StaffClubTransferOwnershipFragment.graphql'
import { Trans } from '@lingui/macro'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import StaffClubTransferOwnershipForm from './StaffClubTransferOwnershipForm/StaffClubTransferOwnershipForm'

interface Props {
  query: StaffClubTransferOwnershipFragment$key
}

const Fragment = graphql`
  fragment StaffClubTransferOwnershipFragment on Club {
    ...StaffClubTransferOwnershipFormFragment
  }
`

export default function StaffClubTransferOwnership ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Collapse>
      <CollapseButton>
        <Trans>
          Transfer Ownership
        </Trans>
      </CollapseButton>
      <CollapseBody>
        <StaffClubTransferOwnershipForm query={data} />
      </CollapseBody>
    </Collapse>
  )
}
