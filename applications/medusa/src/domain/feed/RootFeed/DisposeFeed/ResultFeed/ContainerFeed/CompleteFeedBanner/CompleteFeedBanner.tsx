import BannerPrompt from '@//:common/components/BannerPrompt/BannerPrompt'
import { Trans } from '@lingui/macro'

export default function CompleteFeedBanner (): JSX.Element {
  return (
    <BannerPrompt
      bannerText={<Trans>Finish setting up your curation profile so we can tailor your feed</Trans>}
      buttonText={<Trans>Set Up</Trans>}
      onClick={() => {
      }}
      colorScheme='primary'
    />
  )
}
