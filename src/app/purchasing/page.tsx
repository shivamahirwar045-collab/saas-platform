'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Supplier, PurchaseOrder, PurchaseOrderStatus } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  FileText,
  Building2,
  Plus,
  Search,
  Check,
  X,
  Truck,
  Clock,
  ArrowRight,
  Package
} from '@/components/icons';
import { mockSuppliers, mockPurchaseOrders } from '@/data/mockData';

export default function PurchasingPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'suppliers'>('orders');
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);

  // New PO Modal
  const [isNewPOOpen, setIsNewPOOpen] = useState(false);
  const [poForm, setPOForm] = useState({
    supplierId: mockSuppliers[0].id,
    warehouseName: 'Colon Free Zone Distribution Center',
    totalAmount: 12500,
    itemsCount: 50,
    expectedDate: '2026-10-15',
    notes: ''
  });

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find(s => s.id === poForm.supplierId);
    if (!sup) return;

    const newPO: PurchaseOrder = {
      id: `po_${Date.now()}`,
      poNumber: `PO-2026-0${Math.floor(350 + Math.random() * 50)}`,
      supplierId: sup.id,
      supplierName: sup.name,
      warehouseName: poForm.warehouseName,
      status: 'Ordered',
      itemsCount: Number(poForm.itemsCount),
      totalAmount: Number(poForm.totalAmount),
      issueDate: new Date().toISOString().split('T')[0],
      expectedDeliveryDate: poForm.expectedDate,
      notes: poForm.notes || 'Replenishment order'
    };

    setPurchaseOrders([newPO, ...purchaseOrders]);
    setIsNewPOOpen(false);
  };

  const updatePOStatus = (id: string, status: PurchaseOrderStatus) => {
    setPurchaseOrders(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  // PO Columns
  const poColumns: Column<PurchaseOrder>[] = [
    {
      header: 'PO #',
      cell: (p) => (
        <div>
          <span className="font-bold text-slate-900">{p.poNumber}</span>
          <p className="text-[10px] text-slate-400">Issued: {p.issueDate}</p>
        </div>
      )
    },
    {
      header: 'Vendor / Supplier',
      accessorKey: 'supplierName'
    },
    {
      header: 'Destination Depot',
      accessorKey: 'warehouseName'
    },
    {
      header: 'Total Value',
      cell: (p) => <span className="font-bold text-slate-900">${p.totalAmount.toLocaleString()}</span>
    },
    {
      header: 'Units',
      cell: (p) => <span>{p.itemsCount} pcs</span>
    },
    {
      header: 'Status',
      cell: (p) => (
        <Badge
          variant={
            p.status === 'Received'
              ? 'success'
              : p.status === 'Partially Received'
              ? 'warning'
              : p.status === 'Ordered'
              ? 'info'
              : 'default'
          }
        >
          {p.status}
        </Badge>
      )
    },
    {
      header: 'Workflow Action',
      cell: (p) => (
        <div className="flex gap-1">
          {p.status === 'Ordered' && (
            <button
              onClick={() => updatePOStatus(p.id, 'Partially Received')}
              className="px-2 py-0.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[11px] font-semibold border border-amber-200"
            >
              Receive Partial
            </button>
          )}
          {p.status === 'Partially Received' && (
            <button
              onClick={() => updatePOStatus(p.id, 'Received')}
              className="px-2 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-semibold border border-emerald-200"
            >
              Mark Received
            </button>
          )}
          {p.status === 'Received' && (
            <span className="text-[11px] text-emerald-600 font-bold">✓ Staged</span>
          )}
        </div>
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
              Purchasing &amp; Supplier Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Purchase orders workflow (Draft → Ordered → Partially Received → Received) and vendor pricing histories.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsNewPOOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Purchase Order</span>
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Procurement Volume"
            value="$74,100"
            subtitle="Across 3 pending orders"
            icon={<FileText className="w-5 h-5" />}
          />
          <StatCard
            title="Registered Suppliers"
            value={suppliers.length}
            subtitle="China, Italy, USA"
            icon={<Building2 className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Avg. Vendor Lead Time"
            value="16.6 Days"
            subtitle="Colon Free Zone clearance"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Receiving Accuracy"
            value="99.2%"
            subtitle="Inspection pass rate"
            icon={<Check className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'orders' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" /> Purchase Orders ({purchaseOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'suppliers' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" /> Supplier Directory ({suppliers.length})
          </button>
        </div>

        {/* TAB 1: PURCHASE ORDERS */}
        {activeTab === 'orders' && (
          <DataTable
            data={purchaseOrders}
            columns={poColumns}
            searchPlaceholder="Search purchase orders by number or supplier..."
            title="Procurement Order Ledger"
            subtitle="Track ordered goods from port arrival to warehouse staging"
          />
        )}

        {/* TAB 2: SUPPLIERS */}
        {activeTab === 'suppliers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suppliers.map(s => (
              <div
                key={s.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{s.name}</span>
                    <span className="text-xs font-semibold text-amber-500">★ {s.rating}</span>
                  </div>
                  <p className="text-xs text-slate-500">Contact: {s.contactPerson}</p>
                  <p className="text-xs text-slate-400">{s.email}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Avg Lead Time:</span>
                    <span className="font-semibold text-slate-900">{s.leadTimeDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ID:</span>
                    <span className="font-mono text-slate-500">{s.taxId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active POs:</span>
                    <span className="font-bold text-blue-600">{s.activeOrders} orders</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPOForm({ ...poForm, supplierId: s.id });
                    setIsNewPOOpen(true);
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl text-xs font-semibold transition-colors mt-2"
                >
                  Create PO for {s.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* MODAL: CREATE PO */}
        {isNewPOOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Create Supplier Purchase Order</h3>
                <button onClick={() => setIsNewPOOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePO} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Supplier *</label>
                  <select
                    value={poForm.supplierId}
                    onChange={e => setPOForm({ ...poForm, supplierId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.categories[0]})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Receiving Warehouse</label>
                  <select
                    value={poForm.warehouseName}
                    onChange={e => setPOForm({ ...poForm, warehouseName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    <option value="Colon Free Zone Distribution Center">Colon Free Zone DC</option>
                    <option value="Calle 50 Store Vault & Staging">Calle 50 Store Vault</option>
                    <option value="David Chiriqui Regional Depository">David Chiriqui Depository</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Total Amount ($)</label>
                    <input
                      type="number"
                      required
                      value={poForm.totalAmount}
                      onChange={e => setPOForm({ ...poForm, totalAmount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Expected Units</label>
                    <input
                      type="number"
                      value={poForm.itemsCount}
                      onChange={e => setPOForm({ ...poForm, itemsCount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={poForm.expectedDate}
                    onChange={e => setPOForm({ ...poForm, expectedDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsNewPOOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-semibold shadow-xs"
                  >
                    Issue Purchase Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
