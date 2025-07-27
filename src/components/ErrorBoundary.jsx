import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-10">
          <div className="text-center max-w-md">
            <Icon icon="lucide:alert-triangle" className="w-16 h-16 mx-auto mb-6 text-red-400" />
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
            <p className="text-white/70 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors duration-300 font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
