import { createContext } from 'react'
import { DispatchFunction } from '../../index'

const DispatchContext = createContext<DispatchFunction>(() => {
})

export default DispatchContext
