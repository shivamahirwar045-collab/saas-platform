'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from '../icons';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this section. Please try again.',
  onRetry,
  className = ''
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-rose-50/50 rounded-2xl border border-rose-200 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 mb-4 shadow-2xs">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Try Again
        </Button>
      )}
    </div>
  );
}
