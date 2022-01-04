import { createContext } from 'react'
import type { Dispatch } from '@//:types/upload'

const DispatchContext = createContext<Dispatch>(() => {
})

export default DispatchContext
