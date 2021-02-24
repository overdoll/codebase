/**
 * @flow
 */
import type { Node } from 'react';
import { Component } from 'react';

type Props = {
  children: Node,
};

type Error = {
  message: string,
  source: any,
};

type State = {
  error: ?Error,
};

/**
 * A reusable component for handling errors in a React (sub)tree.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return {
      error,
    };
  }

  render(): Node {
    if (this.state.error != null) {
      return (
        <div>
          <div>Error: {this.state.error.message}</div>
          <div>
            <pre>{JSON.stringify(this.state.error.source, null, 2)}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
