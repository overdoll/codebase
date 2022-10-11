import { ContentContainer } from '@//:modules/content/PageLayout'
import PrepareSampleFeed from './PrepareSampleFeed/PrepareSampleFeed'
import JoinFeedBanner from './JoinFeedBanner/JoinFeedBanner'
import { Stack } from '@chakra-ui/react'
import HeaderFeed from '../HeaderFeed/HeaderFeed'

export default function EmptyFeed (): JSX.Element {
  return (
    <ContentContainer pt={2}>
      <JoinFeedBanner />
      <Stack spacing={4}>
        <HeaderFeed viewerQuery={null} />
        <PrepareSampleFeed />
      </Stack>
    </ContentContainer>
  )
}
