import { graphql, useFragment } from 'react-relay/hooks'
import { PostsSupporterFiltersFragment$key } from '@//:artifacts/PostsSupporterFiltersFragment.graphql'
import { HStack, useDisclosure } from '@chakra-ui/react'
import FilterButton from '../../components/FilterButton/FilterButton'
import { Trans } from '@lingui/macro'
import { HotContent } from '@//:assets/icons'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const LazyModal = dynamic(
  async () => {
    return await import('../../components/SupporterFeatureModal/SupporterFeatureModal')
  }
)

export type PostsSupporterFiltersLoadQuery = (variables: Record<string, any>) => void

interface Props {
  loadQuery: PostsSupporterFiltersLoadQuery
  query: PostsSupporterFiltersFragment$key | null
}

const Fragment = graphql`
  fragment PostsSupporterFiltersFragment on Account {
    hasClubSupporterSubscription
  }
`

export default function PostsSupporterFilters (props: Props): JSX.Element {
  const {
    loadQuery,
    query
  } = props

  const data = useFragment(Fragment, query)

  const [activeFilter, setActiveFilter] = useState('ALGORITHM')

  const onChangeFilter = (filter: string): void => {
    setActiveFilter(filter)
    loadQuery({ sortBy: filter })
  }

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const filterLocked = data?.hasClubSupporterSubscription !== true

  const filterButtons = [
    {
      sortBy: 'ALGORITHM',
      isLocked: false,
      title: <Trans>Trending</Trans>,
      icon: HotContent
    },
    {
      sortBy: 'TOP',
      isLocked: filterLocked,
      title: <Trans>Top</Trans>,
      icon: HotContent
    },
    {
      sortBy: 'NEW',
      isLocked: filterLocked,
      title: <Trans>New</Trans>,
      icon: HotContent
    }
  ]

  return (
    <>
      <HStack spacing={1}>
        {filterButtons.map((item) => (
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
