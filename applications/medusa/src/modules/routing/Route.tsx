import { useHistory } from './useHistory'
import { useLocation } from './Location'

export default function Route ({ children }): any {
  const history = useHistory()
  const location = useLocation()

  return children({
    location,
    history
  })
}
