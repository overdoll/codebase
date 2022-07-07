import { createContext, ReactNode } from 'react'
import { UppyType } from '../../types'

interface UppyProviderProps {
  children: ReactNode
  uppy: UppyType
}

export const UppyContext = createContext<UppyType | null>(null)

export default function UppyProvider (props: UppyProviderProps): JSX.Element {
  const {
    children,
    uppy
  } = props

  return (
    <UppyContext.Provider value={uppy}>
      {children}
    </UppyContext.Provider>
  )
}
