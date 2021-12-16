import { createContextualCan } from '@casl/react'
import { AbilityContext } from './AbilityContext'
import { AppAbility } from './types'

const Can = createContextualCan<AppAbility>(AbilityContext.Consumer)
export default Can
