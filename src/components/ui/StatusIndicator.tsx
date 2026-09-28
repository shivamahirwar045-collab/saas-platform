'use client';

import React from 'react';

export type StatusVariant = 'online' | 'offline' | 'warning' | 'pending' | 'busy';

export interface StatusIndicatorProps {
  status: StatusVariant;
  label?: string;
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusIndicator({
  status,
  label,
  pulse = true,
  size = 'md'
}: StatusIndicatorProps) {
  const dotColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    warning: 'bg-amber-500',
    pending: 'bg-blue-500',
    busy: 'bg-rose-500'
  };

  const pingColors = {
    online: 'bg-emerald-400',
    offline: 'bg-slate-300',
    warning: 'bg-amber-400',
    pending: 'bg-blue-400',
    busy: 'bg-rose-400'
  };

  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex shrink-0">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingColors[status]}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${sizeClasses[size]} ${dotColors[status]}`} />
      </span>
      {label && <span className="text-xs font-medium text-slate-700 capitalize">{label}</span>}
    </span>
  );
}
