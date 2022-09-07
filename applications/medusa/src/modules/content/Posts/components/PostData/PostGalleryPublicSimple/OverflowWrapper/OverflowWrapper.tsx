import PostHideOverflow from '../../PostHideOverflow/PostHideOverflow'
import PostShowOverflow from '../../PostShowOverflow/PostShowOverflow'
import { ReactNode } from 'react'

interface Props {
  hideOverflow: boolean
  children: ReactNode
}

export default function OverflowWrapper (props: Props): JSX.Element {
  const { hideOverflow, children } = props

  if (hideOverflow) {
    return (
      <PostHideOverflow>
        {children}
      </PostHideOverflow>
    )
  }
  return (
    <PostShowOverflow>
      {children}
    </PostShowOverflow>
  )
}
