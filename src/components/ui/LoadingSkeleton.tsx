'use client';

import React from 'react';

export interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'table-row' | 'text' | 'chart';
  className?: string;
}

export function LoadingSkeleton({
  count = 3,
  type = 'card',
  className = ''
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (type === 'table-row') {
    return (
      <div className={`space-y-3 animate-pulse ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-xl flex items-center px-4 gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-200" />
            <div className="flex-1 h-4 bg-slate-200 rounded" />
            <div className="w-24 h-4 bg-slate-200 rounded" />
            <div className="w-16 h-4 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className={`p-6 bg-white rounded-2xl border border-slate-200/80 animate-pulse ${className}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="w-32 h-5 bg-slate-200 rounded" />
          <div className="w-20 h-4 bg-slate-200 rounded" />
        </div>
        <div className="h-56 bg-slate-100 rounded-xl flex items-end p-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-slate-200 rounded-t"
              style={{ height: `${20 + ((i * 17) % 70)}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-2 animate-pulse ${className}`}>
        {items.map((_, i) => (
          <div
            key={i}
            className="h-3.5 bg-slate-200 rounded"
            style={{ width: `${85 - (i * 15)}%` }}
          />
        ))}
      </div>
    );
  }

  // Card skeleton
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse ${className}`}>
      {items.map((_, i) => (
        <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-24 h-4 bg-slate-200 rounded" />
            <div className="w-8 h-8 rounded-lg bg-slate-100" />
          </div>
          <div className="w-32 h-7 bg-slate-200 rounded" />
          <div className="w-20 h-3 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );
}
