import { createContext } from 'react'

interface HorizontalDropdownMenuContext {
  onClose: () => void
}

const HorizontalNavigationDropdownMenuContext = createContext<HorizontalDropdownMenuContext>({
  onClose (): void {
  }
})
export {
  HorizontalNavigationDropdownMenuContext
}
