import { AbilityContext } from '../../../client/domain/Root/helpers/AbilityContext'
import { useContext } from 'react'
import { Ability } from '@casl/ability'

export default function useAbility (): Ability<any> {
  return useContext(AbilityContext)
}
