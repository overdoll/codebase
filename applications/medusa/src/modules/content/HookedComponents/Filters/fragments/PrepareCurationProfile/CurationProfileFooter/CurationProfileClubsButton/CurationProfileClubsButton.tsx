import { t, Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import type { CurationProfileClubsButtonFragment$key } from '@//:artifacts/CurationProfileClubsButtonFragment.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import Button from '../../../../../../../form/Button/Button'

interface Props {
  onClose?: () => void
  query: CurationProfileClubsButtonFragment$key
}

const Fragment = graphql`
  fragment CurationProfileClubsButtonFragment on Account {
    clubMembershipsCount
  }
`

export default function CurationProfileClubsButton (props: Props): JSX.Element {
  const {
    query,
    onClose
  } = props

  const data = useFragment(Fragment, query)

  const notify = useToast()

  const onClick = (): void => {
    onClose?.()
    notify({
      status: 'success',
      title: t`Curation profile completed`
    })
  }

  if (onClose == null) {
    return <></>
  }

  return (
    <Button
      isDisabled={data.clubMembershipsCount < 1}
      onClick={onClick}
      size='lg'
      colorScheme='gray'
      variant='solid'
    >
      <Trans>
        Close
      </Trans>
    </Button>
  )
}
