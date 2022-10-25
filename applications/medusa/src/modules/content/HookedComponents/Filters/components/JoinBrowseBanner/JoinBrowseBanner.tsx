import BannerPrompt from '@//:common/components/BannerPrompt/BannerPrompt'
import { Trans } from '@lingui/macro'
import { useJoin } from '@//:domain/app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'
import { useEffect, useRef } from 'react'
import { Timeout } from '@//:types/components'
import { useLocalStorage } from 'usehooks-ts'
import { useHydrate } from '../../../../../hydrate'

export default function JoinBrowseBanner (): JSX.Element {
  const onJoin = useJoin(undefined, 'join_banner')
  const [showBannerStorage, setShowBannerStorage] = useLocalStorage('showJoinBanner', false)

  const timerRef = useRef<Timeout | null>()

  const isHydrated = useHydrate()

  useEffect(() => {
    if (showBannerStorage) return
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setShowBannerStorage(true)
    }, 20000)

    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timerRef.current, showBannerStorage])

  if (!isHydrated) return <></>

  // show modal after scrolling

  return (
    <>
      {showBannerStorage && (
        <BannerPrompt
          onClick={onJoin}
          buttonText={<Trans>Join</Trans>}
          bannerText={<Trans>Join overdoll to get a personal feed and like posts</Trans>}
          colorScheme='primary'
        />
      )}
    </>
  )
}
