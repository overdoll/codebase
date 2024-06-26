import type { ReactNode } from 'react'
import { Component } from 'react'
import * as Sentry from '@sentry/nextjs'
import shouldCaptureError from './shouldCaptureError'

interface PossibleActions {
  error: Error
  reset: () => void
}

interface Props {
  children: ReactNode
  fallback?: ReactNode | PossibleActions | any
}

interface State {
  error: Error | null
}

/**
 * A reusable component for handling errors in a React (sub)tree.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null
  }

  static getDerivedStateFromError (error: Error): { error: Error } {
    if (shouldCaptureError(error)) {
      Sentry.captureException(error)
    }

    return {
      error
    }
  }

  // Reset error component - attempt a re-render
  reset = (): void => {
    this.setState({ error: null })
  }

  render (): ReactNode {
    if (this.state.error !== null) {
      if (this.props.fallback != null) {
        const Component = this.props.fallback

        return (
          <Component
            error={this.state.error}
            reset={this.reset}
          />
        )
      }

      return (
        <div>
          <div>{JSON.stringify(this.state.error.name, null, 2)}</div>
          <div>Error: {JSON.stringify(this.state.error.message, null, 2)}</div>
          <div>
            <pre>{JSON.stringify(this.state.error.stack, null, 2)}</pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
