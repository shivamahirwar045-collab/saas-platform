'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AuditLogItem } from '@/types/saas';
import { mockAuditLogs } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  Shield,
  Search,
  Filter,
  Clock,
  UserCheck,
  CheckCircle,
  Download,
  AlertTriangle,
  Lock
} from '@/components/icons';

export default function SettingsAuditLogsPage() {
  const { addToast } = useToast();
  const [logs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [selectedModule, setSelectedModule] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(l => {
    const matchesMod = selectedModule === 'All' || l.module === selectedModule;
    const matchesSearch = l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMod && matchesSearch;
  });

  const handleExportCSV = () => {
    addToast('Audit log export generated (SHA-256 integrity stamped)', 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Settings</span>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Security Audit Trail</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Compliance &amp; Access Audit Trail</h1>
            <p className="text-sm text-slate-500">
              Immutable cryptographic ledger of manager overrides, fiscal invoice submissions, and sensitive data exports.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" /> Export Audit Ledger (CSV)
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Events Logged"
            value="14,892"
            subtitle="Trailing 90 days retention"
            icon={<Shield className="w-5 h-5 text-indigo-600" />}
          />
          <StatCard
            title="Fiscal PAC Events"
            value="3,410"
            subtitle="CUFE verified transmissions"
            icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
          />
          <StatCard
            title="Administrative Overrides"
            value="18 Flags"
            subtitle="Supervisor PIN approvals"
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          />
          <StatCard
            title="Immutability Status"
            value="WORM Active"
            subtitle="Write-Once-Read-Many storage"
            icon={<Lock className="w-5 h-5 text-blue-600" />}
          />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search by user, action, entity or IP..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={selectedModule}
              onChange={e => setSelectedModule(e.target.value)}
              options={[
                { value: 'All', label: 'All Modules' },
                { value: 'Fiscal Invoicing', label: 'Fiscal Invoicing' },
                { value: 'POS Cashier', label: 'POS Cashier' },
                { value: 'Inventory', label: 'Inventory' },
                { value: 'Security & Auth', label: 'Security & Auth' },
                { value: 'CRM & Client Data', label: 'CRM & Client Data' },
                { value: 'HR & Attendance', label: 'HR & Attendance' }
              ]}
            />
          </div>

          <span className="text-xs text-slate-500 whitespace-nowrap">
            Showing {filteredLogs.length} audit entries
          </span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Timestamp (UTC-5)</th>
                  <th className="py-3 px-4">Staff Member &amp; Role</th>
                  <th className="py-3 px-4">Action Executed</th>
                  <th className="py-3 px-4">Module Scope</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">IP Address &amp; Session</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredLogs.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {l.timestamp}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{l.user}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{l.role}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {l.action}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono">
                        {l.module}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {l.entity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                      {l.ipAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
