import { ReactNode, useMemo } from 'react'

interface Props {
  memoKey: string
  children: ReactNode
}

export default function MemoKey (props: Props): JSX.Element {
  const {
    memoKey,
    children
  } = props

  return useMemo(() => children, [memoKey]) as JSX.Element
}
