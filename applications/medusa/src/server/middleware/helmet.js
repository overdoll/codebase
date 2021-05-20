import helmet from 'helmet'
import contentSecurityPolicy from '../config/csp'
import expectCt from '../config/eCT'

export default helmet({
  contentSecurityPolicy,
  expectCt,
  hsts: false
})
