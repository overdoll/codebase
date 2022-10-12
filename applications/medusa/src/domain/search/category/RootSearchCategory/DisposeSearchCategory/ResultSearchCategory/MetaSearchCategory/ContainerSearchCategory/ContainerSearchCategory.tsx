import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchCategoryFragment$key } from '@//:artifacts/ContainerSearchCategoryFragment.graphql'
import {
  ContainerSearchCategoryAccountFragment$key
} from '@//:artifacts/ContainerSearchCategoryAccountFragment.graphql'
import { ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import HeaderSearchCategory from './HeaderSearchCategory/HeaderSearchCategory'
import ScrollSearchCategory from './ScrollSearchCategory/ScrollSearchCategory'
import dynamic from 'next/dynamic'

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { ssr: false }
)

const LazyModal = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseModal/JoinBrowseModal')
  },
  { ssr: false }
)

interface Props {
  categoryQuery: ContainerSearchCategoryFragment$key
  accountQuery: ContainerSearchCategoryAccountFragment$key | null
}

const CharacterFragment = graphql`
  fragment ContainerSearchCategoryFragment on Category {
    ...HeaderSearchCategoryFragment
    ...ScrollSearchCategoryFragment
  }
`

const AccountFragment = graphql`
  fragment ContainerSearchCategoryAccountFragment on Account {
    ...ScrollSearchCategoryAccountFragment
  }
`

export default function ContainerSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery,
    accountQuery
  } = props

  const categoryData = useFragment(CharacterFragment, categoryQuery)

  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      {accountData == null && (
        <>
          <LazyBanner />
          <LazyModal />
        </>
      )}
      <MobileContainer pt={2}>
        <HeaderSearchCategory categoryQuery={categoryData} />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollSearchCategory accountQuery={accountData} categoryQuery={categoryData} />
      </ContentContainer>
    </>
  )
}
