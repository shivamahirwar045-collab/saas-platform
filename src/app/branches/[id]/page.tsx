'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { mockBranches, mockProducts, mockCashRegisters } from '@/data/mockData';
import { Branch } from '@/types/saas';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  Building2,
  MapPin,
  Phone,
  Users,
  Monitor,
  CheckCircle,
  Package,
  TrendingUp,
  Receipt,
  Clock,
  ArrowRight,
  ChevronLeft,
  Edit3,
  Sliders,
  AlertTriangle
} from '@/components/icons';

export default function BranchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { setBranch, currentBranch } = useSaaS();
  const { addToast } = useToast();

  const branchId = params?.id as string;
  const branch = mockBranches.find(b => b.id === branchId) || mockBranches[0];

  const [activeTab, setActiveTab] = useState<'registers' | 'personnel' | 'inventory' | 'fiscal'>('registers');
  const [registers, setRegisters] = useState(mockCashRegisters.filter(r => r.branchId === branch.id || r.branchId === 'br_01'));

  // Open/Close Register modal
  const [selectedReg, setSelectedReg] = useState<any | null>(null);

  const handleSwitchActive = () => {
    setBranch(branch);
    addToast(`Active workspace context set to ${branch.name}`, 'success');
  };

  const handleToggleRegister = (regId: string) => {
    setRegisters(prev => prev.map(r => {
      if (r.id === regId) {
        const nextStatus = r.status === 'open' ? 'closed' : 'open';
        return {
          ...r,
          status: nextStatus,
          currentBalance: nextStatus === 'open' ? 250.00 : 0.00
        };
      }
      return r;
    }));
    addToast('Terminal session status updated', 'info');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back Link */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push('/branches')} className="text-slate-600">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Facilities Directory
          </Button>
        </div>

        {/* Facility Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shadow-sm">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{branch.name}</h1>
                <Badge variant={branch.status === 'active' ? 'success' : 'secondary'}>
                  {branch.type.toUpperCase()}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span className="font-mono text-slate-700 font-semibold">{branch.code}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {branch.address}, {branch.city}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {branch.phone}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Manager: {branch.managerName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentBranch?.id === branch.id ? (
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Active Workspace Context
              </span>
            ) : (
              <Button size="sm" onClick={handleSwitchActive}>
                Switch Workspace to this Branch
              </Button>
            )}
          </div>
        </div>

        {/* Quick Branch Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Monthly Sales"
            value={`$${branch.monthlySales.toLocaleString()}`}
            subtitle="Trailing 30-day period"
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          />
          <StatCard
            title="Active Terminals"
            value={`${registers.filter(r => r.status === 'open').length} / ${registers.length} Open`}
            subtitle="POS Cash Registers"
            icon={<Monitor className="w-5 h-5 text-indigo-600" />}
          />
          <StatCard
            title="Staff On Shift"
            value={`${branch.employeeCount} Personnel`}
            subtitle="Attendance geofence active"
            icon={<Users className="w-5 h-5 text-blue-600" />}
          />
          <StatCard
            title="Inventory Valuation"
            value="$184,500.00"
            subtitle="Physical stock on floor & bins"
            icon={<Package className="w-5 h-5 text-amber-600" />}
          />
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 flex gap-4">
          <button
            onClick={() => setActiveTab('registers')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'registers'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Cash Registers & POS ({registers.length})
          </button>
          <button
            onClick={() => setActiveTab('personnel')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'personnel'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Assigned Personnel ({branch.employeeCount})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'inventory'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Local Inventory Stock
          </button>
          <button
            onClick={() => setActiveTab('fiscal')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'fiscal'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Panama PAC & Fiscal Hardware
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'registers' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Branch Cash Terminals</h3>
                <p className="text-xs text-slate-500">Real-time status of physical cashier drawers and shift floats</p>
              </div>
              <Button size="sm" onClick={() => router.push('/pos/register')}>
                Launch POS Cashier Terminal
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Register Name & ID</th>
                    <th className="py-3 px-4">Current Cashier</th>
                    <th className="py-3 px-4">Session Status</th>
                    <th className="py-3 px-4">Opened At</th>
                    <th className="py-3 px-4">Drawer Balance</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registers.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {r.name}
                        <div className="text-[10px] text-slate-400 font-mono">{r.code}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {r.currentCashier || 'None (Station Idle)'}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={r.status === 'open' ? 'success' : 'secondary'}>
                          {r.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        {r.openedAt || '—'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        ${r.currentBalance.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant={r.status === 'open' ? 'outline' : 'primary'}
                          size="sm"
                          onClick={() => handleToggleRegister(r.id)}
                        >
                          {r.status === 'open' ? 'Close Register Shift' : 'Open Shift Float'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'personnel' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Staff Assigned to {branch.name}</h3>
              <Button size="sm" onClick={() => router.push('/attendance/history')}>
                View Punch History & Overtime
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: 'Elena Rostova', role: 'Store Supervisor', shift: '08:30 - 17:30', status: 'On Shift' },
                { name: 'Carlos Mendoza', role: 'Head Cashier', shift: '08:00 - 17:00', status: 'On Shift' },
                { name: 'Maria Santos', role: 'Inventory Auditor', shift: '08:00 - 17:00', status: 'On Shift' },
                { name: 'Lucia Alvarez', role: 'Customer Care Rep', shift: '09:00 - 18:00', status: 'Break' }
              ].map((staff, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{staff.name}</div>
                    <div className="text-[11px] text-slate-500">{staff.role}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">Shift: {staff.shift}</div>
                  </div>
                  <Badge variant={staff.status === 'On Shift' ? 'success' : 'warning'}>
                    {staff.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Local Bins & Stock Allocation</h3>
                <p className="text-xs text-slate-500">Inventory stationed at this facility available for instant POS and walk-in sales</p>
              </div>
              <Button size="sm" onClick={() => router.push('/inventory/warehouses')}>
                Initiate Inter-Branch Transfer
              </Button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {mockProducts.slice(0, 5).map(prod => (
                <div key={prod.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900">{prod.name}</div>
                      <div className="text-slate-400 font-mono text-[10px]">SKU: {prod.sku} • Bin: Aisle 3 / Shelf B</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 block font-mono">${prod.price.toFixed(2)}</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">{prod.stock} units stationed here</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fiscal' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Panama PAC Hardware & Factura Electrónica</h3>
                <p className="text-xs text-slate-500">Authorized DGI PAC provider and POS thermal printing bridge</p>
              </div>
              <Badge variant="success">PAC Handshake 100% OK</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <span className="font-bold text-slate-800 block">PAC Authorization Details</span>
                <div className="text-slate-600">Authorized PAC Provider: <strong>Digifact Servicios Panamá S.A.</strong></div>
                <div className="text-slate-600">Certificate Status: <span className="text-emerald-600 font-bold">Valid (.p12 RSA 2048)</span></div>
                <div className="text-slate-600">Expiration Date: <span className="font-mono">2027-12-31</span></div>
                <div className="text-slate-600">Branch Point of Sale Code: <span className="font-mono font-bold text-indigo-600">{branch.code}</span></div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <span className="font-bold text-slate-800 block">Thermal Receipt Hardware</span>
                <div className="text-slate-600">Protocol: <strong>ESC/POS Network Raw TCP (Port 9100)</strong></div>
                <div className="text-slate-600">Paper Width: <strong>80mm with CUFE 2D Barcode</strong></div>
                <div className="text-slate-600">Hardware Status: <span className="text-emerald-600 font-bold">Online (192.168.1.140)</span></div>
                <Button size="sm" variant="outline" className="mt-2 text-xs" onClick={() => addToast('Test fiscal receipt sent to thermal printer', 'success')}>
                  Print Test Diagnostic Receipt
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
