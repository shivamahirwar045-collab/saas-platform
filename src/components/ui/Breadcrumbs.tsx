'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from '../icons';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // If items not manually provided, auto-generate from pathname
  const breadcrumbList: BreadcrumbItem[] = items || (() => {
    if (!pathname || pathname === '/' || pathname === '/dashboard') {
      return [{ label: 'Dashboard', href: '/dashboard' }];
    }

    const segments = pathname.split('/').filter(Boolean);
    const list: BreadcrumbItem[] = [{ label: 'Dashboard', href: '/dashboard' }];

    let currentHref = '';
    segments.forEach((seg, idx) => {
      currentHref += `/${seg}`;
      if (seg === 'dashboard') return;

      const formattedLabel = seg
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      list.push({
        label: formattedLabel,
        href: idx === segments.length - 1 ? undefined : currentHref
      });
    });

    return list;
  })();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 py-1">
      <ol className="flex items-center space-x-1.5 flex-wrap">
        {breadcrumbList.map((item, index) => {
          const isLast = index === breadcrumbList.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" />}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-900">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
