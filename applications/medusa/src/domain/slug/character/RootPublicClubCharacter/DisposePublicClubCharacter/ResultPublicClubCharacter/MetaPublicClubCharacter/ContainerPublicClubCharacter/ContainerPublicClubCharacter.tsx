import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerPublicClubCharacterFragment$key } from '@//:artifacts/ContainerPublicClubCharacterFragment.graphql'
import {
  ContainerPublicClubCharacterAccountFragment$key
} from '@//:artifacts/ContainerPublicClubCharacterAccountFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import HeaderPublicClubCharacter from './HeaderPublicClubCharacter/HeaderPublicClubCharacter'
import ScrollPublicClubCharacter from './ScrollPublicClubCharacter/ScrollPublicClubCharacter'
import dynamic from 'next/dynamic'
import { Stack } from '@chakra-ui/react'

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
  characterQuery: ContainerPublicClubCharacterFragment$key
  accountQuery: ContainerPublicClubCharacterAccountFragment$key | null
}

const CharacterFragment = graphql`
  fragment ContainerPublicClubCharacterFragment on Character {
    ...HeaderPublicClubCharacterFragment
    ...ScrollPublicClubCharacterFragment
  }
`

const AccountFragment = graphql`
  fragment ContainerPublicClubCharacterAccountFragment on Account {
    ...ScrollPublicClubCharacterAccountFragment
  }
`

export default function ContainerPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    accountQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)

  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      {accountData == null && (
        <>
          <LazyBanner />
          <LazyModal />
        </>
      )}
      <ContentContainer pt={2}>
        <Stack spacing={8}>
          <HeaderPublicClubCharacter characterQuery={characterData} />
          <ScrollPublicClubCharacter accountQuery={accountData} characterQuery={characterData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
