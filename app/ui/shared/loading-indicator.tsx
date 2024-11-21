import React from 'react';

export function LoadingIndicator() {
    return (
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-400 border-t-white rounded-full animate-spin" />
        <p className="mt-4 text-sm text-gray-400 text-center">Loading...</p>
      </div>
    );
  }

export default LoadingIndicator;