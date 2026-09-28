'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { UserRole } from '@/types/saas';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  Shield,
  Check,
  X,
  Lock,
  RotateCcw,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Building2
} from '@/components/icons';

const rolesList: UserRole[] = [
  'Owner',
  'Administrator',
  'Manager',
  'Sales',
  'Cashier',
  'Inventory',
  'Finance',
  'HR',
  'Marketing',
  'Partner/Agency'
];

interface ModulePermission {
  key: string;
  name: string;
  description: string;
}

const modules: ModulePermission[] = [
  { key: 'products', name: 'Products & Multi-Warehouse Inventory', description: 'Stock adjustments, transfers, barcodes & SKU catalog' },
  { key: 'pos', name: 'POS Terminals & Cashier Shift Floats', description: 'Ring up sales, split tender, X/Z reports, thermal receipts' },
  { key: 'fiscal', name: 'Panama PAC Fiscal Invoicing (CUFE / DGI)', description: 'Electronic invoices, credit notes, XML signing' },
  { key: 'orders', name: 'Sales Orders & Multichannel Checkout', description: 'E-commerce, wholesale, WhatsApp cart orders' },
  { key: 'crm', name: 'CRM Contacts & Enterprise Pipeline', description: 'Customer 360 dossiers, leads, B2B deal stages' },
  { key: 'purchasing', name: 'Purchase Orders & Vendor Requisitions', description: 'PO issuance, warehouse dock receipts, supplier pricing' },
  { key: 'delivery', name: 'Fleet Dispatch & Driver Proof of Delivery', description: 'Delivery route dispatch, GPS tracking, signature POD' },
  { key: 'hr', name: 'HR Personnel & Attendance Kiosk Logs', description: 'Biometric punches, dynamic QR, timesheet adjustments' },
  { key: 'financials', name: 'Financial BI, Profit Ledgers & Taxes', description: 'P&L, gross margins, ITBMS tax reconciliations' },
  { key: 'settings', name: 'System Settings, Security & Audit Trail', description: 'MFA enforcement, API keys, immutable audit logs' }
];

type ActionType = 'view' | 'create' | 'edit' | 'approve' | 'export' | 'delete';

type PermissionsMap = Record<string, Record<string, Record<ActionType, boolean>>>;

const initialPermissions: PermissionsMap = {
  Owner: {
    products: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    pos: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    fiscal: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    orders: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    crm: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    purchasing: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    delivery: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    hr: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    financials: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    settings: { view: true, create: true, edit: true, approve: true, export: true, delete: true }
  },
  Administrator: {
    products: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    pos: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    fiscal: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    orders: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    crm: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    purchasing: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    delivery: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    hr: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    financials: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    settings: { view: true, create: true, edit: true, approve: true, export: true, delete: false }
  },
  Manager: {
    products: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    pos: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    fiscal: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    orders: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    crm: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    purchasing: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    delivery: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    hr: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    financials: { view: true, create: false, edit: false, approve: false, export: true, delete: false },
    settings: { view: true, create: false, edit: false, approve: false, export: false, delete: false }
  },
  Sales: {
    products: { view: true, create: false, edit: false, approve: false, export: false, delete: false },
    pos: { view: true, create: true, edit: false, approve: false, export: false, delete: false },
    fiscal: { view: true, create: true, edit: false, approve: false, export: false, delete: false },
    orders: { view: true, create: true, edit: true, approve: false, export: false, delete: false },
    crm: { view: true, create: true, edit: true, approve: false, export: false, delete: false },
    purchasing: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    delivery: { view: true, create: false, edit: false, approve: false, export: false, delete: false },
    hr: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    financials: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    settings: { view: false, create: false, edit: false, approve: false, export: false, delete: false }
  },
  Cashier: {
    products: { view: true, create: false, edit: false, approve: false, export: false, delete: false },
    pos: { view: true, create: true, edit: false, approve: false, export: false, delete: false },
    fiscal: { view: true, create: true, edit: false, approve: false, export: false, delete: false },
    orders: { view: true, create: true, edit: false, approve: false, export: false, delete: false },
    crm: { view: true, create: true, edit: false, approve: false, export: false, delete: false },
    purchasing: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    delivery: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    hr: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    financials: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    settings: { view: false, create: false, edit: false, approve: false, export: false, delete: false }
  },
  Inventory: {
    products: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    pos: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    fiscal: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    orders: { view: true, create: false, edit: false, approve: false, export: true, delete: false },
    crm: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    purchasing: { view: true, create: true, edit: true, approve: false, export: true, delete: false },
    delivery: { view: true, create: true, edit: true, approve: false, export: true, delete: false },
    hr: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    financials: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    settings: { view: false, create: false, edit: false, approve: false, export: false, delete: false }
  },
  Finance: {
    products: { view: true, create: false, edit: false, approve: false, export: true, delete: false },
    pos: { view: true, create: false, edit: false, approve: true, export: true, delete: false },
    fiscal: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    orders: { view: true, create: false, edit: false, approve: true, export: true, delete: false },
    crm: { view: true, create: false, edit: false, approve: false, export: true, delete: false },
    purchasing: { view: true, create: true, edit: true, approve: true, export: true, delete: false },
    delivery: { view: true, create: false, edit: false, approve: false, export: false, delete: false },
    hr: { view: true, create: false, edit: false, approve: true, export: true, delete: false },
    financials: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    settings: { view: true, create: false, edit: false, approve: false, export: true, delete: false }
  },
  HR: {
    products: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    pos: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    fiscal: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    orders: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    crm: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    purchasing: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    delivery: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    hr: { view: true, create: true, edit: true, approve: true, export: true, delete: true },
    financials: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    settings: { view: false, create: false, edit: false, approve: false, export: false, delete: false }
  },
  Marketing: {
    products: { view: true, create: false, edit: false, approve: false, export: false, delete: false },
    pos: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    fiscal: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    orders: { view: true, create: false, edit: false, approve: false, export: true, delete: false },
    crm: { view: true, create: true, edit: true, approve: false, export: true, delete: false },
    purchasing: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    delivery: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    hr: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    financials: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    settings: { view: false, create: false, edit: false, approve: false, export: false, delete: false }
  },
  'Partner/Agency': {
    products: { view: true, create: false, edit: false, approve: false, export: false, delete: false },
    pos: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    fiscal: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    orders: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    crm: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    purchasing: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    delivery: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    hr: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    financials: { view: false, create: false, edit: false, approve: false, export: false, delete: false },
    settings: { view: false, create: false, edit: false, approve: false, export: false, delete: false }
  }
};

export default function SettingsRolesPage() {
  const { addToast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('Manager');
  const [permissions, setPermissions] = useState<PermissionsMap>(initialPermissions);

  const toggleAction = (moduleKey: string, action: ActionType) => {
    if (selectedRole === 'Owner') {
      addToast('Owner role has immutable root permissions and cannot be modified', 'warning');
      return;
    }

    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [moduleKey]: {
          ...prev[selectedRole]?.[moduleKey],
          [action]: !prev[selectedRole]?.[moduleKey]?.[action]
        }
      }
    }));
  };

  const handleApplyPreset = (preset: 'Strict Compliance' | 'Balanced Retail' | 'Full Access') => {
    if (selectedRole === 'Owner') return;

    if (preset === 'Strict Compliance') {
      setPermissions(prev => {
        const updated = { ...prev[selectedRole] };
        modules.forEach(m => {
          updated[m.key] = {
            view: true,
            create: false,
            edit: false,
            approve: false,
            export: false,
            delete: false
          };
        });
        return { ...prev, [selectedRole]: updated };
      });
      addToast(`Applied "Strict Compliance" (Read-Only) preset to ${selectedRole}`, 'info');
    } else if (preset === 'Full Access') {
      setPermissions(prev => {
        const updated = { ...prev[selectedRole] };
        modules.forEach(m => {
          updated[m.key] = {
            view: true,
            create: true,
            edit: true,
            approve: true,
            export: true,
            delete: true
          };
        });
        return { ...prev, [selectedRole]: updated };
      });
      addToast(`Granted elevated full privileges to ${selectedRole}`, 'warning');
    } else {
      addToast(`Reset ${selectedRole} to default role baseline`, 'info');
    }
  };

  const handleSaveMatrix = () => {
    addToast(`RBAC matrix for role "${selectedRole}" deployed across all facilities`, 'success');
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
              <span className="text-slate-800 font-semibold">RBAC Permissions</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Granular RBAC Permission Matrix</h1>
            <p className="text-sm text-slate-500">
              Configure 6-dimensional access rights across 10 functional modules for each staff persona.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/settings/users'}>
              View Team Members
            </Button>
            <Button size="sm" onClick={handleSaveMatrix}>
              Save RBAC Changes
            </Button>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto">
          {rolesList.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedRole === role
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              {role}
              {role === 'Owner' && <span className="text-[10px] bg-indigo-800 text-indigo-200 px-1.5 py-0.2 rounded font-mono">Root</span>}
            </button>
          ))}
        </div>

        {/* Preset Toolbar */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Quick Policy Presets for {selectedRole}:</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleApplyPreset('Balanced Retail')}>
              Reset to Recommended Baseline
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs text-amber-700" onClick={() => handleApplyPreset('Strict Compliance')}>
              Apply View-Only Policy
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs text-rose-700" onClick={() => handleApplyPreset('Full Access')}>
              Grant All Privileges
            </Button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-5 w-1/3">Functional Module & Scope</th>
                  <th className="py-3 px-3 text-center">View</th>
                  <th className="py-3 px-3 text-center">Create</th>
                  <th className="py-3 px-3 text-center">Edit</th>
                  <th className="py-3 px-3 text-center">Approve</th>
                  <th className="py-3 px-3 text-center">Export</th>
                  <th className="py-3 px-3 text-center">Delete / Void</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modules.map(mod => {
                  const perms = permissions[selectedRole]?.[mod.key] || {
                    view: false,
                    create: false,
                    edit: false,
                    approve: false,
                    export: false,
                    delete: false
                  };

                  return (
                    <tr key={mod.key} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold text-slate-900 text-sm">{mod.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{mod.description}</div>
                      </td>

                      {(['view', 'create', 'edit', 'approve', 'export', 'delete'] as ActionType[]).map(action => {
                        const isGranted = perms[action];
                        const isOwner = selectedRole === 'Owner';

                        return (
                          <td key={action} className="py-4 px-3 text-center">
                            <button
                              type="button"
                              disabled={isOwner}
                              onClick={() => toggleAction(mod.key, action)}
                              className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                                isGranted
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                              } ${isOwner ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                              title={`${action.toUpperCase()} on ${mod.name}`}
                            >
                              {isGranted ? <Check className="w-4 h-4 font-bold" /> : <X className="w-4 h-4" />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              All permission evaluations are enforced at API gateway boundary and reflected in client menu navigation.
            </span>
            <span className="font-mono text-slate-600">Active Tenant Policy: v4.2-2026</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
