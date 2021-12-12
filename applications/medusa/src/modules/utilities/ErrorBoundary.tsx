import type { ComponentType } from 'react'
import { Component } from 'react'

interface Props {
  children: JSX.Element
  fallback?: ComponentType
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
    return {
      error
    }
  }

  // Reset error component - attempt a re-render
  reset = (): void => {
    this.setState({ error: null })
  }

  render (): JSX.Element {
    if (this.state.error !== null) {
      if (this.props.fallback != null) {
        const Component = this.props.fallback

        return (
          <Component
            // @ts-expect-error
            error={this.state.error}
            reset={this.reset}
          />
        )
      }

      return (
        <div>
          <div>Error: {this.state.error.message}</div>
          <div>
            <pre>{JSON.stringify(this.state.error.stack, null, 2)}</pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
