import HorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { Trans } from '@lingui/macro'
import { DownloadArrow } from '@//:assets/icons/interface'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import posthog from 'posthog-js'

let deferredPrompt

export default function DropdownMenuButtonInstallApp (): JSX.Element {
  const [isInstalled, setIsInstalled] = useState(false)

  const [isLaunchedInApp] = useMediaQuery('@media all and (display-mode: standalone)')

  const onInstall = (): void => {
    deferredPrompt.prompt()

    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        setIsInstalled(true)
      }
      deferredPrompt = null
    })
  }

  // catch before install and use the button to trigger it
  useEffect(() => {
    const onBeforeInstall = (e): void => {
      deferredPrompt = e
    }

    document.addEventListener('beforeinstallprompt', (e) => onBeforeInstall(e))

    return () => document.removeEventListener('beforeinstallprompt', (e) => onBeforeInstall(e))
  }, [])

  // detect PWA app install
  useEffect(() => {
    const onInstallApp = (): void => {
      setIsInstalled(true)
      posthog?.capture(
        'pwa-install'
      )
    }

    document.addEventListener('appinstalled', onInstallApp)

    return () => document.removeEventListener('appinstalled', onInstallApp)
  }, [])

  if (isInstalled || isLaunchedInApp || deferredPrompt == null) return <></>

  return (
    <HorizontalNavigationDropdownMenu.Button
      color='teal.300'
      icon={DownloadArrow}
      onClick={onInstall}
      label={
        <Trans>
          Get App
        </Trans>
      }
    />
  )
}
