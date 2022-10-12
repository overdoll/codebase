import { ContentContainer } from '@//:modules/content/PageLayout'
import PrepareSampleFeed from './PrepareSampleFeed/PrepareSampleFeed'
import JoinFeedBanner from './JoinFeedBanner/JoinFeedBanner'
import { Stack } from '@chakra-ui/react'
import HeaderFeed from '../HeaderFeed/HeaderFeed'
import PreviewUnlockShadow
  from '@//:modules/content/HookedComponents/Filters/components/PreviewUnlockShadow/PreviewUnlockShadow'

export default function EmptyFeed (): JSX.Element {
  return (
    <ContentContainer pt={2}>
      <JoinFeedBanner />
      <Stack position='relative' spacing={4}>
        <HeaderFeed viewerQuery={null} />
        <PrepareSampleFeed />
        <PreviewUnlockShadow />
      </Stack>
    </ContentContainer>
  )
}
