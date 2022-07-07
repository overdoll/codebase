import { useContext } from 'react'
import { UppyContext } from '../../components/UppyProvider/UppyProvider'
import { UseUploadReturnType } from '../../types'

export default function useUppyContext (): UseUploadReturnType {
  return useContext(UppyContext) as UseUploadReturnType
}
