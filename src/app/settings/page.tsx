'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useSaaS } from '../../context/SaaSContext';
import { UserRole } from '../../types/saas';
import { Badge } from '../../components/ui/Badge';
import {
  Settings,
  Building2,
  Users,
  Shield,
  Key,
  Download,
  Sliders,
  Check,
  X,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  MapPin,
  Lock
} from '../../components/icons';
import { mockUsers, mockBranches } from '../../data/mockData';

export default function SettingsPage() {
  const { currentBusiness, setCurrentBusiness, currentUser, switchUserRole } = useSaaS();
  const [activeTab, setActiveTab] = useState<'business' | 'users' | 'permissions' | 'security' | 'api' | 'export'>('business');

  // Business form state
  const [bizForm, setBizForm] = useState({
    name: currentBusiness.name,
    email: currentBusiness.email,
    phone: currentBusiness.phone,
    address: currentBusiness.address,
    taxId: currentBusiness.taxId,
    dv: currentBusiness.dv,
    brandColor: currentBusiness.brandColor
  });

  // Granular Permission Matrix Matrix
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

  const permissionModules = [
    { key: 'products', name: 'Products & Inventory' },
    { key: 'orders', name: 'Orders & Sales History' },
    { key: 'pos', name: 'POS Cash Registers' },
    { key: 'fiscal', name: 'Panama PAC Fiscal Invoicing' },
    { key: 'crm', name: 'CRM Customers & Leads' },
    { key: 'purchasing', name: 'Purchase Orders & Suppliers' },
    { key: 'hr', name: 'Employees & Payroll' },
    { key: 'financials', name: 'Banking & Financial Reports' }
  ];

  const [permissionsState, setPermissionsState] = useState<Record<string, Record<string, boolean>>>({
    Owner: { create: true, view: true, edit: true, approve: true, export: true, delete: true },
    Administrator: { create: true, view: true, edit: true, approve: true, export: true, delete: false },
    Manager: { create: true, view: true, edit: true, approve: true, export: true, delete: false },
    Sales: { create: true, view: true, edit: false, approve: false, export: false, delete: false },
    Cashier: { create: true, view: true, edit: false, approve: false, export: false, delete: false },
    Inventory: { create: true, view: true, edit: true, approve: false, export: true, delete: false },
    Finance: { create: true, view: true, edit: true, approve: true, export: true, delete: false },
    HR: { create: true, view: true, edit: true, approve: true, export: true, delete: false },
    Marketing: { create: true, view: true, edit: true, approve: false, export: true, delete: false },
    'Partner/Agency': { create: false, view: true, edit: false, approve: false, export: false, delete: false }
  });

  const togglePermission = (role: string, action: string) => {
    setPermissionsState(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [action]: !prev[role]?.[action]
      }
    }));
  };

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: 'key_01', name: 'Shopify Sync Adapter', key: 'pk_live_89104821094819028', created: '2026-01-10', status: 'Active' },
    { id: 'key_02', name: 'WhatsApp Webhook Bot', key: 'pk_live_33910294810293811', created: '2026-03-22', status: 'Active' }
  ]);

  // Export State
  const [exportingCategory, setExportingCategory] = useState<string | null>(null);

  const handleRunExport = (cat: string) => {
    setExportingCategory(cat);
    setTimeout(() => {
      setExportingCategory(null);
      alert(`Export completed for ${cat}! Simulated JSON/CSV payload downloaded.`);
    }, 1000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Settings &amp; Security Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Organization profile, team roles, granular permission matrix, MFA, and developer API keys.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-mono">
              Tenant ID: {currentBusiness.id}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('business')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'business' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" /> Business &amp; Branding
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'users' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" /> Users &amp; Team ({mockUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'permissions' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" /> Granular Permission Matrix
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'security' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" /> Security &amp; MFA
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'api' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Key className="w-4 h-4" /> Developer API &amp; Webhooks
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'export' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Download className="w-4 h-4" /> Data Portability &amp; Export
          </button>
        </div>

        {/* TAB 1: BUSINESS & BRANDING */}
        {activeTab === 'business' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-3xl space-y-5 text-xs">
            <h3 className="text-base font-bold text-slate-900">Legal Entity &amp; Visual Branding</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Company Legal Name</label>
                <input
                  type="text"
                  value={bizForm.name}
                  onChange={e => setBizForm({ ...bizForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Brand Color Accent</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={bizForm.brandColor}
                    onChange={e => setBizForm({ ...bizForm, brandColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={bizForm.brandColor}
                    onChange={e => setBizForm({ ...bizForm, brandColor: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Panama RUC</label>
                <input
                  type="text"
                  value={bizForm.taxId}
                  onChange={e => setBizForm({ ...bizForm, taxId: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Dígito Verificador (DV)</label>
                <input
                  type="text"
                  value={bizForm.dv}
                  onChange={e => setBizForm({ ...bizForm, dv: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contact Email</label>
                <input
                  type="email"
                  value={bizForm.email}
                  onChange={e => setBizForm({ ...bizForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Telephone</label>
                <input
                  type="text"
                  value={bizForm.phone}
                  onChange={e => setBizForm({ ...bizForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Official Fiscal Address</label>
              <input
                type="text"
                value={bizForm.address}
                onChange={e => setBizForm({ ...bizForm, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setCurrentBusiness({ ...currentBusiness, ...bizForm });
                  alert('Business profile updated successfully!');
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-xs"
              >
                Save Organization Profile
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: USERS */}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Authorized Team Members</h3>
                <p className="text-slate-500">Manage user logins, roles, and security credentials</p>
              </div>
              <button
                onClick={() => alert('Invitation modal opened')}
                className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl font-semibold"
              >
                + Invite User
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {mockUsers.map(u => (
                <div key={u.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover border" />
                    <div>
                      <p className="font-bold text-slate-900">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.email} • {u.branchName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-lg text-slate-800">
                      {u.role}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      {u.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GRANULAR PERMISSION MATRIX */}
        {activeTab === 'permissions' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Granular Role Permission Matrix</h3>
                <p className="text-slate-500">Define Create, View, Edit, Approve, Export, and Delete rights across all 10 roles</p>
              </div>
              <span className="text-xs text-blue-600 font-semibold">Strict Role-Based Access Control (RBAC)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                    <th className="p-3 pl-4">Role Title</th>
                    <th className="p-3 text-center">Create</th>
                    <th className="p-3 text-center">View</th>
                    <th className="p-3 text-center">Edit</th>
                    <th className="p-3 text-center">Approve</th>
                    <th className="p-3 text-center">Export</th>
                    <th className="p-3 text-center pr-4">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rolesList.map(role => {
                    const p = permissionsState[role] || {
                      create: false, view: true, edit: false, approve: false, export: false, delete: false
                    };

                    return (
                      <tr key={role} className="hover:bg-slate-50/60">
                        <td className="p-3 pl-4 font-bold text-slate-900">
                          {role}
                        </td>
                        {(['create', 'view', 'edit', 'approve', 'export', 'delete'] as const).map(action => (
                          <td key={action} className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={p[action]}
                              disabled={role === 'Owner'}
                              onChange={() => togglePermission(role, action)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & MFA */}
        {activeTab === 'security' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Security Credentials &amp; Session Controls</h3>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Multi-Factor Authentication (MFA / 2FA)</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Enforce authenticator app (TOTP) codes for all logins</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg text-xs">
                Enabled
              </span>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-800">Active Login Sessions</span>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900">MacBook Pro (Chrome 128)</p>
                    <p className="text-[10px] text-slate-400">Panama City (IP: 190.140.88.12) • Current Session</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">Active Now</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900">iPad Pro (POS Terminal Register 01)</p>
                    <p className="text-[10px] text-slate-400">Calle 50 Store (IP: 10.0.1.42)</p>
                  </div>
                  <button onClick={() => alert('Session revoked')} className="text-rose-600 font-bold text-[11px]">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: API & WEBHOOKS */}
        {activeTab === 'api' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Developer API Keys &amp; Webhooks</h3>
                <p className="text-slate-500">Access REST / JSON central API layer for external integrations</p>
              </div>
              <button
                onClick={() => {
                  const newKey = {
                    id: `key_${Date.now()}`,
                    name: 'Custom ERP Sync',
                    key: `pk_live_${Math.random().toString(36).substring(2, 18)}`,
                    created: 'Today',
                    status: 'Active'
                  };
                  setApiKeys([...apiKeys, newKey]);
                }}
                className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl font-semibold"
              >
                + Generate API Key
              </button>
            </div>

            <div className="space-y-2">
              {apiKeys.map(k => (
                <div key={k.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{k.name}</p>
                    <p className="font-mono text-[11px] text-slate-500">{k.key}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">
                      {k.status}
                    </span>
                    <button
                      onClick={() => setApiKeys(apiKeys.filter(x => x.id !== k.id))}
                      className="text-rose-500 hover:text-rose-700 font-semibold"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Webhook endpoint */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800">External Webhook Endpoint</span>
              <p className="text-slate-500">Dispatched events: `order.created`, `payment.succeeded`, `fiscal.authorized`, `inventory.low_stock`</p>
              <input
                type="text"
                defaultValue="https://api.acmeretail.com/webhooks/saas-events"
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono"
              />
            </div>
          </div>
        )}

        {/* TAB 6: DATA EXPORT */}
        {activeTab === 'export' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-3xl space-y-4 text-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Data Portability &amp; Backup Export</h3>
              <p className="text-slate-500">Download complete structured datasets for migrations or compliance audits.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Customer Records & Contacts', count: '2,410 entities', format: 'JSON / CSV' },
                { title: 'Product Catalog & SKUs', count: '128 items', format: 'JSON / CSV' },
                { title: 'Omnichannel Orders Ledger', count: '1,248 transactions', format: 'JSON / CSV' },
                { title: 'Panama PAC Fiscal Invoices', count: '49,281 records (CUFE)', format: 'XML / PDF / CSV' },
                { title: 'CRM Leads & Pipelines', count: '5 active deals', format: 'JSON / CSV' },
                { title: 'HR Attendance Timestamps', count: '1,840 clock-ins', format: 'CSV' }
              ].map((cat, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{cat.title}</p>
                    <p className="text-[11px] text-slate-500">{cat.count} • Format: {cat.format}</p>
                  </div>
                  <button
                    disabled={exportingCategory === cat.title}
                    onClick={() => handleRunExport(cat.title)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 shadow-2xs"
                  >
                    {exportingCategory === cat.title ? 'Exporting...' : 'Export'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
