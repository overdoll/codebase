import { createContext, ReactNode } from 'react'
import { UseSequenceReturn } from '../../types'

export type SequenceContextProps = UseSequenceReturn<Record<string, any>>

interface SequenceProviderProps extends SequenceContextProps {
  children: ReactNode
}

export const SequenceContext = createContext<SequenceContextProps | null>(null)

export default function SequenceProvider (props: SequenceProviderProps): JSX.Element {
  const {
    children,
    ...methods
  } = props

  return (
    <SequenceContext.Provider value={methods}>
      {children}
    </SequenceContext.Provider>
  )
}
