import { createContext } from 'react'
import type { State } from '@//:types/upload'

import { INITIAL_STATE } from '../../constants/constants'

const StateContext = createContext<State>(INITIAL_STATE)

export default StateContext
