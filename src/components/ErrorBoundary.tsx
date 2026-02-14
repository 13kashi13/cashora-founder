import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050a0a] flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-red-950/20 border border-red-500/30 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              Something went wrong
            </h1>
            <div className="bg-black/40 rounded p-4 mb-4">
              <p className="text-red-300 font-mono text-sm">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>
            <details className="text-white/60 text-sm">
              <summary className="cursor-pointer hover:text-white/80 mb-2">
                Stack trace
              </summary>
              <pre className="bg-black/40 rounded p-4 overflow-auto text-xs">
                {this.state.error?.stack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
