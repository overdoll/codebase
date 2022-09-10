import React, { useEffect, useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import { useToast } from '@//:modules/content/ThemeComponents'
import JoinToast from './JoinToast/JoinToast'

interface Props {
  isHidden: boolean
}

export default function ShowJoinToast (props: Props): JSX.Element {
  const { isHidden } = props

  const [isOpen, setOpen] = useState(false)

  const [closedJoinPopupStorage, setClosedJoinPopupStorage] = useSessionStorage('closedNavigationJoinPopup', false)

  const toast = useToast()

  const closePopup = (): void => {
    setOpen(false)
    setClosedJoinPopupStorage(true)
  }

  const openPopup = (): void => {
    if (closedJoinPopupStorage || isHidden) return
    openToast()
    setOpen(true)
  }

  const openToast = (): void => {
    toast(
      {
        render: (renderProps) => (
          <JoinToast
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
    if (isHidden || isOpen) return
    setTimeout(openPopup, 30000)
  }, [isHidden, isOpen])

  return (
    <></>
  )
}
