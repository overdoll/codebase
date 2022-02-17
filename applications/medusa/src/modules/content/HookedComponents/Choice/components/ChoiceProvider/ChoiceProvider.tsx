import { createContext, ReactNode } from 'react'
import { ChoiceAnyValues, UseChoiceReturn } from '../../types'

export type ChoiceContextProps = UseChoiceReturn<ChoiceAnyValues>

interface ChoiceProviderProps extends ChoiceContextProps {
  children: ReactNode
}

export const ChoiceContext = createContext<ChoiceContextProps | null>(null)

export default function ChoiceProvider (props: ChoiceProviderProps): JSX.Element {
  const {
    children,
    ...methods
  } = props

  return (
    <ChoiceContext.Provider value={methods}>
      {children}
    </ChoiceContext.Provider>
  )
}
