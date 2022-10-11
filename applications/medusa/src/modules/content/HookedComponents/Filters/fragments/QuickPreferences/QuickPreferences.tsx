import { graphql, useFragment } from 'react-relay/hooks'
import { QuickPreferencesFragment$key } from '@//:artifacts/QuickPreferencesFragment.graphql'
import { useDisclosure } from '@chakra-ui/react'
import FilterButton from '../../components/FilterButton/FilterButton'
import { Trans } from '@lingui/macro'
import dynamic from 'next/dynamic'
import { MagicBall } from '@//:assets/icons'

const LazyModal = dynamic(
  async () => {
    return await import('../../components/QuickPreferencesModal/QuickPreferencesModal')
  }
)

interface Props {
  query: QuickPreferencesFragment$key | null
}

const Fragment = graphql`
  fragment QuickPreferencesFragment on Account {
    ...QuickPreferencesModalFragment
  }
`

export default function QuickPreferences (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  return (
    <>
      <FilterButton
        onClickEnabled={onOpen}
        onClickLocked={onOpen}
        isLocked={false}
        isActive={false}
        icon={MagicBall}
        hasBadge={data == null}
        title={<Trans>Preferences</Trans>}
      />
      <LazyModal
        isOpen={isOpen}
        onClose={onClose}
        query={data}
      />
    </>
  )
}
