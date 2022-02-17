import { createContext, ReactNode } from 'react'
import { SearchAnyValues, UseSearchReturn } from '../../types'

export type SearchContextProps = UseSearchReturn<SearchAnyValues>

interface SearchProviderProps extends SearchContextProps {
  children: ReactNode
}

export const SearchContext = createContext<SearchContextProps | null>(null)

export default function SearchProvider (props: SearchProviderProps): JSX.Element {
  const {
    children,
    ...methods
  } = props

  return (
    <SearchContext.Provider value={methods}>
      {children}
    </SearchContext.Provider>
  )
}
