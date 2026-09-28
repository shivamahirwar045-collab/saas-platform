import React from 'react';
import { ArrowUpRight } from '../icons';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon,
  iconBg = 'bg-blue-50 text-blue-600',
  onClick
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-medium ${
              isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isPositive ? '+' : ''}{change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
