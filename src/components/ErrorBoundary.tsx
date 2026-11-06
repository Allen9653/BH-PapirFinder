import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Check if it's a context-related error
    if (error.message.includes('useLanguage') || error.message.includes('LanguageProvider')) {
      console.error('🔴 Context Error Detected:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isContextError = this.state.error?.message.includes('useLanguage') || 
                            this.state.error?.message.includes('LanguageProvider');

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="max-w-2xl w-full border-red-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div>
                  <CardTitle className="text-2xl text-red-600">
                    {isContextError ? 'Context Error' : 'Something went wrong'}
                  </CardTitle>
                  <CardDescription>
                    {isContextError 
                      ? 'The language context is not properly initialized'
                      : 'An unexpected error occurred in the application'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error Details */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-sm text-red-800 mb-2">Error Details:</h3>
                <p className="text-sm text-red-700 font-mono break-all">
                  {this.state.error?.message}
                </p>
              </div>

              {/* Context Error Specific Help */}
              {isContextError && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-sm text-blue-800 mb-2">Troubleshooting Steps:</h3>
                  <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>Clear your browser cache and cookies</li>
                    <li>Clear localStorage data</li>
                    <li>Try refreshing the page</li>
                    <li>Check if JavaScript is enabled</li>
                  </ul>
                </div>
              )}

              {/* Stack Trace (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
                <details className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                  <summary className="font-semibold text-sm cursor-pointer text-gray-700">
                    Stack Trace (Development Only)
                  </summary>
                  <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-64">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              {/* Component Stack (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.errorInfo?.componentStack && (
                <details className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                  <summary className="font-semibold text-sm cursor-pointer text-gray-700">
                    Component Stack (Development Only)
                  </summary>
                  <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-64">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={this.handleReset} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Reload Page
                </Button>
                <Button onClick={this.handleGoHome} variant="outline" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;