import { ReactNode } from 'react'

export type MaybeRenderProp<P> =
  | ReactNode
  | ((props: P) => ReactNode)
