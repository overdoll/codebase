import { AbilityContext } from './AbilityContext'
import { useContext } from 'react'
import { Ability } from '@casl/ability'

export default function useAbility (): Ability<any> {
  return useContext(AbilityContext)
}
