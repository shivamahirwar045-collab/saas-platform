'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useSaaS } from '../../context/SaaSContext';
import { AuditLogItem } from '../../types/saas';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import {
  Shield,
  Search,
  Filter,
  Clock,
  UserCheck,
  CheckCircle,
  AlertTriangle
} from '../../components/icons';
import { mockAuditLogs } from '../../data/mockData';

export default function AuditLogsPage() {
  const [logs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [selectedModule, setSelectedModule] = useState('All');

  const filteredLogs = logs.filter(l =>
    selectedModule === 'All' ? true : l.module === selectedModule
  );

  const logColumns: Column<AuditLogItem>[] = [
    {
      header: 'Timestamp',
      accessorKey: 'timestamp',
      className: 'font-mono text-[11px]'
    },
    {
      header: 'User & Role',
      cell: (l) => (
        <div>
          <span className="font-bold text-slate-900">{l.user}</span>
          <p className="text-[10px] text-slate-400">{l.role}</p>
        </div>
      )
    },
    {
      header: 'Action Performed',
      cell: (l) => <span className="font-semibold text-slate-800">{l.action}</span>
    },
    {
      header: 'Target Module',
      accessorKey: 'module'
    },
    {
      header: 'Affected Entity',
      cell: (l) => <span className="font-mono text-[11px] text-slate-600">{l.entity}</span>
    },
    {
      header: 'IP Address',
      accessorKey: 'ipAddress',
      className: 'text-[11px] text-slate-400 font-mono'
    },
    {
      header: 'Status',
      cell: (l) => (
        <Badge variant={l.status === 'Success' ? 'success' : l.status === 'Denied' ? 'danger' : 'warning'}>
          {l.status}
        </Badge>
      )
    }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise Audit Trail &amp; Compliance Logs
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Immutable ledger of sensitive operations across POS cash sessions, PAC settings, discounts, and API events.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedModule}
              onChange={e => setSelectedModule(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-700"
            >
              <option value="All">All Modules</option>
              <option value="Fiscal Billing">Fiscal Billing</option>
              <option value="POS">POS</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Payments API">Payments API</option>
            </select>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Events Logged"
            value="14,290"
            subtitle="Trailing 30 days"
            icon={<Shield className="w-5 h-5" />}
          />
          <StatCard
            title="Integrity Status"
            value="100% Cryptographic"
            isPositive={true}
            subtitle="SHA-256 chained"
            icon={<CheckCircle className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Access Denied Events"
            value="0 Flagged"
            isPositive={true}
            subtitle="RBAC enforced"
            icon={<AlertTriangle className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="API Webhook Retries"
            value="4 Passed"
            subtitle="Idempotent processing"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-teal-50 text-teal-600"
          />
        </div>

        {/* Audit Logs Table */}
        <DataTable
          data={filteredLogs}
          columns={logColumns}
          searchPlaceholder="Search audit events by user, action or IP address..."
          title="Security &amp; Operational Audit Trail"
          subtitle="Meets Panama DGI PAC audit compliance guidelines"
        />
      </div>
    </AppShell>
  );
}
