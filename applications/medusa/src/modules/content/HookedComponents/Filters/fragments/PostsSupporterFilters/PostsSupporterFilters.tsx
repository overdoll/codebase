import { graphql, useFragment } from 'react-relay/hooks'
import { PostsSupporterFiltersFragment$key } from '@//:artifacts/PostsSupporterFiltersFragment.graphql'
import { HStack, useDisclosure } from '@chakra-ui/react'
import FilterButton from '../../components/FilterButton/FilterButton'
import { Trans } from '@lingui/macro'
import { FreshLeaf, HotContent, RisingGraph } from '@//:assets/icons'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { RefetchFnDynamic } from 'react-relay/relay-hooks/useRefetchableFragmentNode'

const LazyModal = dynamic(
  async () => {
    return await import('../../components/SupporterFeatureModal/SupporterFeatureModal')
  }
)

export type PostsSupporterFiltersLoadQuery = (variables: Record<string, any>) => void

type DefaultFilterType = 'ALGORITHM' | 'NEW' | 'TOP'

interface Props {
  loadQuery: PostsSupporterFiltersLoadQuery | RefetchFnDynamic<any, any>
  query: PostsSupporterFiltersFragment$key | null
  defaultValue?: DefaultFilterType
  newLocked?: boolean
}

const Fragment = graphql`
  fragment PostsSupporterFiltersFragment on Account {
    hasClubSupporterSubscription
    isStaff
  }
`

export default function PostsSupporterFilters (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    defaultValue = 'ALGORITHM',
    newLocked = true
  } = props

  const data = useFragment(Fragment, query)

  const [activeFilter, setActiveFilter] = useState<DefaultFilterType>(defaultValue)

  const onChangeFilter = (filter: DefaultFilterType): void => {
    setActiveFilter(filter)
    loadQuery({ sortBy: filter }, { fetchPolicy: 'network-only' })
  }

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const filterLocked = data?.hasClubSupporterSubscription !== true && data?.isStaff !== true

  const filterButtons = [
    {
      order: newLocked ? 0 : 1,
      sortBy: 'ALGORITHM' as DefaultFilterType,
      isLocked: false,
      title: <Trans>Trending</Trans>,
      icon: HotContent
    },
    {
      order: newLocked ? 1 : 2,
      sortBy: 'TOP' as DefaultFilterType,
      isLocked: filterLocked,
      title: <Trans>Top</Trans>,
      icon: RisingGraph
    },
    {
      order: newLocked ? 2 : 0,
      sortBy: 'NEW' as DefaultFilterType,
      isLocked: filterLocked && newLocked,
      title: <Trans>New</Trans>,
      icon: FreshLeaf
    }
  ]

  const sortedButtons = filterButtons.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))

  return (
    <>
      <HStack spacing={1}>
        {sortedButtons.map((item) => (
          <FilterButton
            key={item.sortBy}
            onClickEnabled={() => onChangeFilter(item.sortBy)}
            onClickLocked={onOpen}
            isLocked={item.isLocked}
            isActive={activeFilter === item.sortBy}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </HStack>
      <LazyModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
