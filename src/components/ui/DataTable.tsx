'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, ChevronRight, Eye } from '../icons';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onRowClick?: (item: T) => void;
  pageSize?: number;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchKey,
  title,
  subtitle,
  actions,
  onRowClick,
  pageSize = 8,
  emptyMessage = 'No matching records found'
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  // Filter
  const filteredData = data.filter(item => {
    if (!search) return true;
    if (searchKey) {
      const val = String(item[searchKey]).toLowerCase();
      return val.includes(search.toLowerCase());
    }
    // Search across all string properties
    return Object.values(item).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSelectAll = () => {
    if (selectedIds.size === currentData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(currentData.map(item => item.id)));
    }
  };

  const toggleSelectOne = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleExportCsv = () => {
    if (filteredData.length === 0) return;

    const headers = columns.map(c => `"${c.header.replace(/"/g, '""')}"`).join(',');
    const rows = filteredData.map(item => {
      return columns.map(col => {
        let val = '';
        if (col.accessorKey) {
          const raw = item[col.accessorKey];
          val = typeof raw === 'object' ? JSON.stringify(raw) : String(raw ?? '');
        } else {
          val = (item as any).name || (item as any).title || (item as any).orderNumber || (item as any).poNumber || (item as any).id || '';
        }
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',');
    });

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileName = `${(title || 'Export').toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {(title || actions || searchKey !== undefined) && (
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {actions}

            <button
              title="Export CSV"
              onClick={handleExportCsv}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Selected Action Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-blue-50/70 border-b border-blue-100 px-5 py-2.5 flex items-center justify-between text-xs text-blue-900">
          <span className="font-medium">{selectedIds.size} item(s) selected</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                alert(`Bulk operation applied to ${selectedIds.size} items.`);
                setSelectedIds(new Set());
              }}
              className="px-2.5 py-1 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-md font-medium"
            >
              Bulk Action
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-2 py-1 text-slate-500 hover:text-slate-700"
            >
              Deselect
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
              <th className="p-3.5 pl-5 w-8">
                <input
                  type="checkbox"
                  checked={currentData.length > 0 && selectedIds.size === currentData.length}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                />
              </th>
              {columns.map((col, idx) => (
                <th key={idx} className={`p-3.5 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Filter className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                    <p className="text-sm font-medium text-slate-600">{emptyMessage}</p>
                    <p className="text-xs text-slate-400">Try adjusting your search criteria or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentData.map((item) => {
                const isSelected = selectedIds.has(item.id);
                return (
                  <tr
                    key={item.id}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={`transition-colors hover:bg-slate-50/70 ${
                      isSelected ? 'bg-blue-50/40' : ''
                    } ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    <td className="p-3.5 pl-5 w-8" onClick={(e) => toggleSelectOne(item.id, e)}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                    </td>
                    {columns.map((col, idx) => (
                      <td key={idx} className={`p-3.5 text-slate-700 ${col.className || ''}`}>
                        {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey] ?? '') : null}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 sm:px-5 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-semibold text-slate-700">
            {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-slate-700">
            {Math.min(currentPage * pageSize, filteredData.length)}
          </span>{' '}
          of <span className="font-semibold text-slate-700">{filteredData.length}</span> records
        </div>

        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-slate-600"
          >
            Prev
          </button>
          <span className="px-2 font-medium text-slate-700">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-slate-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
