import { useHistory } from './useHistory'
import { Location } from 'history'

export const useLocation = (): Location => {
  return useHistory().location
}
