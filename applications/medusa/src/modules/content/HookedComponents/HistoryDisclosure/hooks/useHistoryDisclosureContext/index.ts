import { useContext } from 'react'
import {
  HistoryDisclosureContext,
  HistoryDisclosureContextProps
} from '../../components/HistoryDisclosureProvider/HistoryDisclosureProvider'

export default function useHistoryDisclosureContext (): HistoryDisclosureContextProps {
  return useContext(HistoryDisclosureContext) as HistoryDisclosureContextProps
}
