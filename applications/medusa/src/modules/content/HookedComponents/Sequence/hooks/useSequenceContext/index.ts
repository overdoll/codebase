import { useContext } from 'react'
import { SequenceContext, SequenceContextProps } from '../../components/SequenceProvider/SequenceProvider'

export default function useSequenceContext (): SequenceContextProps {
  return useContext(SequenceContext) as SequenceContextProps
}
