import { AbilityContext } from '../../../../client/domain/Root/helpers/AbilityContext'
import { useContext } from 'react'

export default function useAbilityContext () {
  return useContext(AbilityContext)
}
