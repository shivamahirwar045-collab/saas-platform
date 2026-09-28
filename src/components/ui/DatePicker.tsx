'use client';

import React from 'react';
import { Calendar } from '../icons';

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function DatePicker({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: DatePickerProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-2xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Calendar className="w-4 h-4" />
        </div>
        <input
          type="date"
          id={inputId}
          className={`w-full rounded-xl border bg-white pl-9 pr-3.5 py-2 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 ${
            error
              ? 'border-rose-300 focus:border-rose-500'
              : 'border-slate-300 hover:border-slate-400'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}
