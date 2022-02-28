import { ForwardedRef, ReactNode } from 'react'

export type MaybeRenderProp<P> =
  | ReactNode
  | ((props: P) => ReactNode)

export interface ForwardRefProp {
  forwardRef?: ForwardedRef<any>
}

export interface ConnectionProp {
  connectionId: string
}

export interface InputPlaceholder {
  placeholder: string
}
