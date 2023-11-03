import { Component, ErrorInfo, ReactNode } from 'react';

type State = {
  hasError: boolean;
};

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};

export default class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.log(error, info.componentStack, 111);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          {this.props.fallback}
        </div>
      );
    }

    return this.props.children;
  }
}
