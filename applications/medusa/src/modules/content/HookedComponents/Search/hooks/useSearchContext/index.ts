import { useContext } from 'react'
import { SearchContext, SearchContextProps } from '../../components/SearchProvider/SearchProvider'

export default function useSearchContext (): SearchContextProps {
  return useContext(SearchContext) as SearchContextProps
}
