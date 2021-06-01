import { render } from '@testing-library/react'
import Finish from './Finish'

it('should render', async () => {
  render(<Finish state={{ submit: { review: false } }} />)
})
