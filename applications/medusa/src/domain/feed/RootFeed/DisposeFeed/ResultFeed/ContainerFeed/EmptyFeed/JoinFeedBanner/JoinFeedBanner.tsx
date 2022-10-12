import BannerPrompt from '@//:common/components/BannerPrompt/BannerPrompt'
import { Trans } from '@lingui/macro'
import { useJoin } from '../../../../../../../app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'

export default function JoinFeedBanner (): JSX.Element {
  const onJoin = useJoin(undefined, 'feed_banner')

  return (
    <BannerPrompt
      bannerText={<Trans>Join to unlock a daily personalized content feed</Trans>}
      buttonText={<Trans>Join</Trans>}
      onClick={onJoin}
      colorScheme='primary'
    />
  )
}
