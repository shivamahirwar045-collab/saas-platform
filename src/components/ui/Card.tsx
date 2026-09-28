'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  const variantClasses = {
    default: 'bg-white rounded-2xl border border-slate-200/80 shadow-xs',
    flat: 'bg-slate-50 rounded-2xl border border-slate-100',
    bordered: 'bg-white rounded-2xl border-2 border-slate-200'
  };

  return (
    <div className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
}
