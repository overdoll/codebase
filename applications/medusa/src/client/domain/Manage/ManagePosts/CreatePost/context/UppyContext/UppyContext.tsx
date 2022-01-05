import { createContext } from 'react'
import type { Uppy } from '@uppy/core'
import UppyInstance from '../../hooks/uppy/Uppy'

const UppyContext = createContext<Uppy>(UppyInstance)

export default UppyContext
