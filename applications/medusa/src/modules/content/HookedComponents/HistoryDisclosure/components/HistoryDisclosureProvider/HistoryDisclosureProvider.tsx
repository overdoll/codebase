import { createContext, ReactNode } from 'react'
import { UseDisclosureProps } from '@chakra-ui/react'

export type HistoryDisclosureContextProps = UseDisclosureProps

interface HistoryDisclosureProviderProps extends HistoryDisclosureContextProps {
  children: ReactNode
}

export const HistoryDisclosureContext = createContext<HistoryDisclosureContextProps | null>(null)

export default function HistoryDisclosureProvider (props: HistoryDisclosureProviderProps): JSX.Element {
  const {
    children,
    ...methods
  } = props

  return (
    <HistoryDisclosureContext.Provider value={methods}>
      {children}
    </HistoryDisclosureContext.Provider>
  )
}
