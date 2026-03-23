import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = 'Something went wrong.';
      
      try {
        // Check if the error is a FirestoreErrorInfo JSON string
        const errorData = JSON.parse(this.state.error?.message || '');
        if (errorData.error && errorData.operationType) {
          errorMessage = `Firestore Error (${errorData.operationType}): ${errorData.error}`;
        }
      } catch (e) {
        // Not a JSON error, use the original message
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-surface p-6">
          <div className="max-w-md w-full bg-surface-container-high rounded-3xl p-8 shadow-xl border border-outline-variant/20 text-center space-y-6">
            <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-5xl">error</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-on-surface font-headline">Application Error</h2>
              <p className="text-on-surface-variant">{errorMessage}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
