'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Branch } from '@/types/saas';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  Users,
  Monitor,
  CheckCircle,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Store,
  Layers,
  Edit3
} from '@/components/icons';

export default function BranchesPage() {
  const { branches, setBranch, currentBranch } = useSaaS();
  const { addToast } = useToast();

  const [branchList, setBranchList] = useState<Branch[]>(branches);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  // Add Branch Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formType, setFormType] = useState<'store' | 'warehouse' | 'headquarters' | 'hybrid'>('store');
  const [formAddress, setFormAddress] = useState('');
  const [formCity, setFormCity] = useState('Panama City');
  const [formPhone, setFormPhone] = useState('+507 390-4400');
  const [formManager, setFormManager] = useState('');
  const [formRegisters, setFormRegisters] = useState('2');

  const filteredBranches = branchList.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.managerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || b.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalRegisters = branchList.reduce((acc, b) => acc + b.registerCount, 0);
  const totalEmployees = branchList.reduce((acc, b) => acc + b.employeeCount, 0);
  const totalSales = branchList.reduce((acc, b) => acc + b.monthlySales, 0);

  const handleSelectBranch = (b: Branch) => {
    setBranch(b);
    addToast(`Switched active workspace branch to "${b.name}"`, 'success');
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const newBranch: Branch = {
      id: `br_${Date.now().toString().slice(-4)}`,
      businessId: 'biz_01',
      name: formName,
      code: formCode || `B-${formName.slice(0, 3).toUpperCase()}-0${branchList.length + 1}`,
      type: formType,
      address: formAddress || 'Calle 50, Ciudad de Panamá',
      city: formCity,
      phone: formPhone,
      managerName: formManager || 'Pending Assignment',
      status: 'active',
      employeeCount: 4,
      registerCount: Number(formRegisters) || 1,
      monthlySales: 0
    };

    setBranchList([...branchList, newBranch]);
    setIsAddModalOpen(false);
    setFormName('');
    setFormCode('');
    setFormAddress('');
    addToast(`New facility "${newBranch.name}" registered successfully`, 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Branch & Facility Management</h1>
            <p className="text-sm text-slate-500">
              Manage multi-branch retail stores, bonded free-zone warehouses, cash registers, and physical inventory bins.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Branch / Facility
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Operating Locations"
            value={branchList.length}
            subtitle="Stores, hubs & bonded zones"
            icon={<Building2 className="w-5 h-5 text-indigo-600" />}
          />
          <StatCard
            title="Active Cash Registers"
            value={totalRegisters}
            subtitle="Fiscal PAC hardware paired"
            icon={<Monitor className="w-5 h-5 text-blue-600" />}
          />
          <StatCard
            title="Staff Deployed On-Site"
            value={totalEmployees}
            subtitle="Geofence & attendance active"
            icon={<Users className="w-5 h-5 text-purple-600" />}
          />
          <StatCard
            title="Consolidated Monthly Turnover"
            value={`$${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subtitle="Across all physical points"
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          />
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search branch name, code, manager, city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              options={[
                { value: 'All', label: 'All Facility Types' },
                { value: 'headquarters', label: 'Headquarters' },
                { value: 'store', label: 'Retail Store' },
                { value: 'warehouse', label: 'Distribution Warehouse' },
                { value: 'hybrid', label: 'Hybrid Outlet' }
              ]}
            />
          </div>

          <span className="text-xs text-slate-500 whitespace-nowrap">
            Showing {filteredBranches.length} locations
          </span>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filteredBranches.map(b => {
            const isCurrent = currentBranch?.id === b.id;

            return (
              <div
                key={b.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all relative flex flex-col justify-between space-y-4 ${
                  isCurrent
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top Row */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs ${
                        b.type === 'headquarters' ? 'bg-indigo-600' :
                        b.type === 'warehouse' ? 'bg-amber-600' :
                        'bg-blue-600'
                      }`}>
                        {b.type === 'warehouse' ? <Layers className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                          {b.name}
                          {isCurrent && (
                            <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                              Active Context
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-slate-400">{b.code}</div>
                      </div>
                    </div>

                    <Badge variant={b.status === 'active' ? 'success' : 'secondary'}>
                      {b.type.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Address & Contact */}
                  <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{b.address}, {b.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Manager: <strong className="text-slate-800">{b.managerName}</strong></span>
                    </div>
                  </div>

                  {/* Mini Stats Box */}
                  <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-50 rounded-xl text-center text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Registers</span>
                      <span className="font-bold text-slate-800">{b.registerCount} Units</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Personnel</span>
                      <span className="font-bold text-slate-800">{b.employeeCount} Staff</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Monthly Sales</span>
                      <span className="font-bold text-emerald-600">${b.monthlySales.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {!isCurrent ? (
                    <Button variant="outline" size="sm" onClick={() => handleSelectBranch(b)}>
                      Set as Active Branch
                    </Button>
                  ) : (
                    <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Context Selected
                    </span>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs font-semibold text-slate-700 hover:text-indigo-600"
                    onClick={() => window.location.href = `/branches/${b.id}`}
                  >
                    View Branch Details →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Branch Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register New Operating Facility"
        >
          <form onSubmit={handleCreateBranch} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Name</label>
              <Input
                placeholder="e.g. Albrook Mall Kiosk Express"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch Code</label>
                <Input
                  placeholder="e.g. B-ALB-05"
                  value={formCode}
                  onChange={e => setFormCode(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
                <Select
                  value={formType}
                  onChange={e => setFormType(e.target.value as any)}
                  options={[
                    { value: 'store', label: 'Retail Store' },
                    { value: 'warehouse', label: 'Warehouse / Logistics' },
                    { value: 'headquarters', label: 'Headquarters' },
                    { value: 'hybrid', label: 'Hybrid Outlet' }
                  ]}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Physical Address</label>
              <Input
                placeholder="e.g. Albrook Mall, Pasillo del Koala #K-12"
                value={formAddress}
                onChange={e => setFormAddress(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City / Region</label>
                <Input
                  value={formCity}
                  onChange={e => setFormCity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Direct Phone</label>
                <Input
                  value={formPhone}
                  onChange={e => setFormPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Manager</label>
                <Input
                  placeholder="e.g. Roberto Morales"
                  value={formManager}
                  onChange={e => setFormManager(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cash Registers (POS)</label>
                <Select
                  value={formRegisters}
                  onChange={e => setFormRegisters(e.target.value)}
                  options={[
                    { value: '1', label: '1 Register' },
                    { value: '2', label: '2 Registers' },
                    { value: '3', label: '3 Registers' },
                    { value: '4', label: '4 Registers' },
                    { value: '6', label: '6 Registers' }
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Register Facility & Initialize POS
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
