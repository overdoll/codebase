import dynamic from 'next/dynamic'
import { ContainerBrowseCharactersFragment$key } from '@//:artifacts/ContainerBrowseCharactersFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Suspense } from 'react'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollBrowseCharacters from './ScrollBrowseCharacters/ScrollBrowseCharacters'
import { Stack } from '@chakra-ui/react'
import { CharacterIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { suspense: true }
)

const LazyModal = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseModal/JoinBrowseModal')
  },
  { suspense: true }
)

interface Props {
  rootQuery: ContainerBrowseCharactersFragment$key
}

const Fragment = graphql`
  fragment ContainerBrowseCharactersFragment on Query {
    viewer {
      __typename
    }
    ...ScrollBrowseCharactersFragment
  }
`

export default function ContainerBrowseCharacters (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <>
      <Suspense fallback={<></>}>
        {data.viewer == null && (
          <>
            <LazyBanner />
            <LazyModal />
          </>
        )}
      </Suspense>
      <ContentContainer pt={2}>
        <Stack spacing={2}>
          <PageHeader icon={CharacterIdentifier} title={<Trans>Browse characters</Trans>} />
          <ScrollBrowseCharacters query={data} />
        </Stack>
      </ContentContainer>
    </>
  )
}
