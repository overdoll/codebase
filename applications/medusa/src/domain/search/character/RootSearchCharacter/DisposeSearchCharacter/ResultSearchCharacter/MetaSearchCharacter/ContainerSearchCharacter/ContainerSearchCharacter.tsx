import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerSearchCharacterFragment$key } from '@//:artifacts/ContainerSearchCharacterFragment.graphql'
import {
  ContainerSearchCharacterAccountFragment$key
} from '@//:artifacts/ContainerSearchCharacterAccountFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import HeaderSearchCharacter from './HeaderSearchCharacter/HeaderSearchCharacter'
import ScrollSearchCharacter from './ScrollSearchCharacter/ScrollSearchCharacter'
import dynamic from 'next/dynamic'
import { Stack } from '@chakra-ui/react'

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { ssr: false }
)

interface Props {
  characterQuery: ContainerSearchCharacterFragment$key
  accountQuery: ContainerSearchCharacterAccountFragment$key | null
}

const CharacterFragment = graphql`
  fragment ContainerSearchCharacterFragment on Character {
    ...HeaderSearchCharacterFragment
    ...ScrollSearchCharacterFragment
  }
`

const AccountFragment = graphql`
  fragment ContainerSearchCharacterAccountFragment on Account {
    ...ScrollSearchCharacterAccountFragment
  }
`

export default function ContainerSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    accountQuery
  } = props

  const characterData = useFragment(CharacterFragment, characterQuery)
  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <>
      {accountData == null && (
        <LazyBanner />
      )}
      <ContentContainer pt={2}>
        <Stack spacing={8}>
          <HeaderSearchCharacter characterQuery={characterData} />
          <ScrollSearchCharacter accountQuery={accountData} characterQuery={characterData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
