import React from 'react';
import { Compass, RotateCcw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('YATRA Runtime Boundary Caught:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn('Storage cleanup issue:', e);
    }
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F2F4F7] text-[#111827] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-200 flex items-center justify-center mb-4 text-[#008CFF]">
            <Compass size={32} className="animate-spin-slow" />
          </div>
          
          <span className="font-mono text-xs uppercase tracking-wider text-[#008CFF] font-semibold mb-1">
            YATRA RECOVERY PROTOCOL
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-2">
            Trip Interface Restored
          </h1>
          <p className="text-sm text-gray-600 max-w-md mb-4 leading-relaxed">
            Puraana cache ya temporary connection error detect hua hai. Click karke page ko smoothly reload karein.
          </p>

          {this.state.error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg font-mono text-xs max-w-lg mb-6 overflow-x-auto text-left">
              <span className="font-bold">Details:</span> {this.state.error?.message || String(this.state.error)}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Reload Yatra Portal</span>
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="px-5 py-3 rounded-full bg-white border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Home size={16} />
              <span>Go to Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
