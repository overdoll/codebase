import { createContext } from 'react'
import { Ability } from '@casl/ability'
import { AppAbility } from './types'

export const AbilityContext = createContext<AppAbility>(new Ability())
