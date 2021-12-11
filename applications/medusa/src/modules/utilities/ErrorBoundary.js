/**
 * @flow
 */
import type { ComponentType, Node } from 'react'
import { Component } from 'react'

type Props = {
  children: Node,
  fallback?: ComponentType,
};

type Error = {
  message: string,
};

type State = {
  error: ?Error,
};

export type { Error }

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

  render (): Node {
    if (this.state.error !== null) {
      if (this.props.fallback) {
        const Component = this.props.fallback

        return <Component error={this.state.error} reset={this.reset} />
      }

      return (
        <div>
          <div>Error: {this.state.error.message}</div>
          <div>
            <pre>{JSON.stringify(this.state.error.source, null, 2)}</pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
