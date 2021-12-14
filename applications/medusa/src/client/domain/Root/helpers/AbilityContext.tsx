import { createContext } from 'react'
import { createContextualCan } from '@casl/react'
import { Ability } from '@casl/ability'

export const AbilityContext = createContext<Ability<any>>({})
export const Can = createContextualCan(AbilityContext.Consumer)
