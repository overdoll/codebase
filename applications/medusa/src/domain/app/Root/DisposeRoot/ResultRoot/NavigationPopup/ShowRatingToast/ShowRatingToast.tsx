import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useToast } from '@//:modules/content/ThemeComponents'
import RatingToast from './RatingToast/RatingToast'
import { useRouter } from 'next/router'

export default function ShowRatingToast (): JSX.Element {
  const [isOpen, setOpen] = useState(false)
  const [routeChangeCount, setRouteChangeCount] = useState(0)
  const [closedRatingPopupStorage, setClosedRatingPopupStorage] = useLocalStorage('closedNavigationRatingPopup', false)

  const toast = useToast()

  const router = useRouter()

  const closePopup = (): void => {
    setClosedRatingPopupStorage(true)
    setOpen(false)
  }

  const openPopup = (): void => {
    if (closedRatingPopupStorage) return
    setOpen(true)
    openToast()
  }

  const onRouteChangeEnd = (): void => {
    setRouteChangeCount(x => x + 1)
  }

  const openToast = (): void => {
    toast(
      {
        render: (renderProps) => (
          <RatingToast
            onForget={() => {
              closePopup()
              renderProps.onClose()
            }}
            onClose={() => {
              renderProps.onClose()
            }}
          />
        ),
        duration: null,
        position: 'top-right',
        containerStyle: {
          minWidth: '300px',
          maxWidth: '300px'
        }
      }
    )
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', onRouteChangeEnd)
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeEnd)
    }
  }, [])

  useEffect(() => {
    if (routeChangeCount >= 6 && !isOpen) {
      openPopup()
    }
  }, [routeChangeCount, isOpen])

  return (
    <></>
  )
}
