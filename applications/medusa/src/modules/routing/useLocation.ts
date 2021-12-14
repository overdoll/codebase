import { useHistory } from '@//:modules/routing/useHistory'
import { Location } from 'history'

export const useLocation = (): Location => {
  return useHistory().location
}
