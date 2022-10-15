import BannerPrompt from '@//:common/components/BannerPrompt/BannerPrompt'
import { Trans } from '@lingui/macro'
import { useRouter } from 'next/router'

export default function LockedLikesBanner (): JSX.Element {
  const router = useRouter()

  return (
    <BannerPrompt
      onClick={async () => await router.push('/supporter')}
      buttonText={<Trans>Support</Trans>}
      bannerText={<Trans>Become a club supporter to see your liked posts</Trans>}
      colorScheme='orange'
    />
  )
}
