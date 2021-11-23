/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch
}

export default function Submit ({ uppy, state, dispatch }: Props): Node {
  return (
    <>
      {state.isInReview && <>post in review</>}
      your post has been submitted or something else
    </>
  )
}
