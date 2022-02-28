import { useContext } from 'react'
import { ChoiceContext, ChoiceContextProps } from '../../components/ChoiceProvider/ChoiceProvider'

export default function useChoiceContext (): ChoiceContextProps {
  return useContext(ChoiceContext) as ChoiceContextProps
}
