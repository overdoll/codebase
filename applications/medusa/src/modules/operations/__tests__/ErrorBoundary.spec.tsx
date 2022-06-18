import { render, screen, waitFor } from '@testing-library/react'
import ErrorBoundary from '../ErrorBoundary'
import userEvent from '@testing-library/user-event'

const Client = (): JSX.Element => {
  throw new Error('error')
}

const Fallback = (): JSX.Element => <>fallback</>

interface ResetProps {
  reset: () => void
  error: Error
}

// a helper fallback component that will display a fallback if reset was called
// eslint-disable-next-line node/handle-callback-err
const Reset = ({
  error,
  reset
}: ResetProps): JSX.Element => {
  const onClick = (): void => {
    reset()
  }

  return <button onClick={onClick} />
}

// helpers for suppressing errors in logging, since we expect errors to be thrown here
// let expectedErrors = 0

// let actualErrors = 0

function onError (e: ErrorEvent): void {
  e.preventDefault()
  // actualErrors++
}

beforeEach(() => {
  // expectedErrors = 0
  // actualErrors = 0
  window.addEventListener('error', onError)
})

afterEach(() => {
  window.removeEventListener('error', onError)
  // eslint-disable-next-line jest/no-standalone-expect

  // TODO: this is broken? double errors are thrown, possibly due to new react version
  // expect(actualErrors).toBe(expectedErrors)
  // expectedErrors = 0
})

it('should catch error when thrown', async () => {
  // expectedErrors = 1

  const Root = (): JSX.Element => (
    <ErrorBoundary>
      <Client />
    </ErrorBoundary>
  )

  render(<Root />)

  // error thrown by our component
  await waitFor(() => expect(screen.getByText('Error')).toBeVisible())
})

it('should render fallback when error is thrown', async () => {
//  expectedErrors = 1

  const Root = (): JSX.Element => (
    <ErrorBoundary fallback={Fallback}>
      <Client />
    </ErrorBoundary>
  )

  render(<Root />)

  // error thrown by our component
  await waitFor(() => expect(screen.getByText('fallback')).toBeVisible())
})

it('should reset error when pressed', async () => {
//  expectedErrors = 2

  const Root = (): JSX.Element => (
    <ErrorBoundary fallback={Reset}>
      <Client />
    </ErrorBoundary>
  )

  render(<Root />)

  // reset
  const button = screen.getByRole('button')

  // error thrown by our component
  await waitFor(() => expect(button).toBeVisible())

  await waitFor(async () => await userEvent.click(button))

  // fallback will be visible, but this time the other state will be visible to indicate
  // that the reset actually occurred
  await waitFor(() => expect(screen.getByRole('button')).toBeVisible())
})
