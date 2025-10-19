import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console and potentially to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50/30 to-orange-50/30 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                We're sorry, but something unexpected happened. This has been reported and we're working to fix it.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                    Error Details (Development)
                  </summary>
                  <div className="bg-gray-100 rounded-lg p-3 text-xs font-mono text-gray-700 overflow-auto max-h-32">
                    <div className="font-semibold text-red-600 mb-1">Error:</div>
                    <div className="mb-2">{this.state.error.toString()}</div>
                    <div className="font-semibold text-red-600 mb-1">Stack Trace:</div>
                    <div className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</div>
                  </div>
                </details>
              )}

              <div className="flex gap-3">
                <button
                  onClick={this.handleRetry}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

