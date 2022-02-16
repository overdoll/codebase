import { createContext, ReactNode } from 'react'
import { ChoiceAnyValues, RegisterFunctionReturn, UseChoiceReturn } from '../../types'

export type ChoiceContextProps = UseChoiceReturn<ChoiceAnyValues>

interface ChoiceProviderProps extends ChoiceContextProps {
  children: ReactNode
}

export const ChoiceContext = createContext<ChoiceContextProps>({
  clearValues (): void {
  },
  onChange (): void {
  },
  register (): RegisterFunctionReturn {
    return {
      isActive: false,
      id: '',
      onChange: () => {
      }
    }
  },
  removeValue (): void {
  },
  removeValues (): void {
  },
  values: {},
  value: null
})

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
