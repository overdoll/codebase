import { Trans } from '@lingui/macro'
import { useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { CompleteFeedBannerFragment$key } from '@//:artifacts/CompleteFeedBannerFragment.graphql'
import { graphql } from 'react-relay'
import { Suspense } from 'react'
import { useFragment } from 'react-relay/hooks'

const LazyBanner = dynamic(
  async () => {
    return await import('@//:common/components/BannerPrompt/BannerPrompt')
  },
  {
    suspense: true
  }
)

const LazyModal = dynamic(
  async () => {
    return await import('../../../../../../../common/components/CurationProfileModal/CurationProfileModal')
  },
  {
    suspense: true
  }
)

interface Props {
  viewerQuery: CompleteFeedBannerFragment$key
}

const ViewerFragment = graphql`
  fragment CompleteFeedBannerFragment on Account {
    clubMembershipsCount
    curationProfile {
      audience {
        completed
      }
    }
  }
`

export default function CompleteFeedBanner (props: Props): JSX.Element {
  const { viewerQuery } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  if (!isOpen && (viewerData.clubMembershipsCount > 0 && viewerData.curationProfile.audience.completed)) {
    return <></>
  }

  return (
    <Suspense fallback={<></>}>
      <LazyBanner
        bannerText={<Trans>Set up your curation profile so we can tailor your feed</Trans>}
        buttonText={<Trans>Set Up</Trans>}
        onClick={onOpen}
        colorScheme='primary'
      />
      <LazyModal isOpen={isOpen} onClose={onClose} />
    </Suspense>
  )
}
