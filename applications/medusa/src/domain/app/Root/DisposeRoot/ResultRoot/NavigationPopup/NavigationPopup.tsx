import { useRouter } from 'next/router'
import ShowRatingToast from './ShowRatingToast/ShowRatingToast'

export default function NavigationPopup (): JSX.Element {
  const hiddenOn = ['/join', '/verify-token', '/confirm-email', '/logout']
  const router = useRouter()

  const isHidden = hiddenOn.some((item) => router.asPath.includes(item))

  if (isHidden) {
    return <></>
  }

  return (
    <ShowRatingToast />
  )
}
