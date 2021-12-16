import { AbilityContext } from './AbilityContext'
import { useContext } from 'react'
import { AppAbility } from './types'

export default function useAbility (): AppAbility {
  return useContext<AppAbility>(AbilityContext)
}
