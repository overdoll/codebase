import { useRouter } from 'next/router'
import ShowJoinToast from './ShowJoinToast/ShowJoinToast'
import ShowRatingToast from './ShowRatingToast/ShowRatingToast'
import { graphql, useFragment } from 'react-relay/hooks'
import { NavigationPopupFragment$key } from '@//:artifacts/NavigationPopupFragment.graphql'

interface Props {
  query: NavigationPopupFragment$key | null
}

const Fragment = graphql`
  fragment NavigationPopupFragment on Account {
    __typename
  }
`

export default function NavigationPopup (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const hiddenOn = ['/join', '/verify-token', '/confirm-email', '/logout']
  const router = useRouter()

  const isHidden = hiddenOn.some((item) => router.asPath.includes(item))

  if (isHidden) {
    return <></>
  }

  return (
    <>
      {data == null && (
        <ShowJoinToast />
      )}
      <ShowRatingToast />
    </>
  )
}
