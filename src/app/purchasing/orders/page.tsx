'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { PurchaseOrder, PurchaseOrderStatus } from '@/types/saas';
import { mockPurchaseOrders, mockSuppliers } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  FileText,
  Search,
  Plus,
  CheckCircle,
  Truck,
  Building2,
  Clock,
  Printer,
  ChevronRight
} from '@/components/icons';

export default function PurchasingOrdersPage() {
  const { products } = useSaaS();
  const { success, info } = useToast();

  const [orders, setOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New PO form
  const [supplierId, setSupplierId] = useState(mockSuppliers[0].id);
  const [warehouseName, setWarehouseName] = useState('Colon Free Zone Distribution Center');
  const [poNotes, setPoNotes] = useState('');
  const [lines, setLines] = useState([
    { productName: products[0]?.name || 'UltraBook Pro X1 Carbon', quantity: 20, unitCost: 1200 }
  ]);

  const filtered = orders.filter((po) => {
    const matchesSearch =
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const poSubtotal = lines.reduce((sum, l) => sum + l.quantity * l.unitCost, 0);
  const poTax = poSubtotal * 0.07;
  const poGrandTotal = poSubtotal + poTax;

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = mockSuppliers.find((s) => s.id === supplierId) || mockSuppliers[0];

    const newPO: PurchaseOrder = {
      id: `po_${Date.now()}`,
      poNumber: `PO-2026-0${Math.floor(350 + Math.random() * 50)}`,
      supplierId: sup.id,
      supplierName: sup.name,
      warehouseName,
      status: 'Ordered',
      itemsCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      totalAmount: poGrandTotal,
      issueDate: new Date().toISOString().split('T')[0],
      expectedDeliveryDate: '2026-10-20',
      notes: poNotes || 'Replenishment order for high-velocity SKUs'
    };

    setOrders([newPO, ...orders]);
    setIsCreateOpen(false);
    success('Purchase Order Dispatched', `${newPO.poNumber} issued to ${sup.name}.`);
  };

  const handleReceivePO = (poId: string) => {
    const updated = orders.map((po) =>
      po.id === poId ? { ...po, status: 'Received' as PurchaseOrderStatus } : po
    );
    setOrders(updated);
    success('Stock Received', 'Warehouse inventory balances automatically incremented.');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Purchase Orders (POs)</h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                {orders.length} Total POs
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Issue replenishment orders to wholesale vendors, track in-transit containers, and accept stock receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/purchasing/suppliers">
              <Button variant="outline" size="sm">
                Suppliers Directory
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateOpen(true)}
            >
              Issue Purchase Order
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/purchasing" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/purchasing/suppliers" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Suppliers
          </Link>
          <Link href="/purchasing/orders" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Purchase Orders
          </Link>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by PO # or vendor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['All', 'Draft', 'Ordered', 'Partially Received', 'Received'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">PO # & Issue Date</th>
                  <th className="py-3.5 px-4">Supplier</th>
                  <th className="py-3.5 px-4">Destination Facility</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Units Count</th>
                  <th className="py-3.5 px-4">Fulfillment Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((po) => {
                  const getStatusBadge = (st: string) => {
                    switch (st) {
                      case 'Received':
                        return 'success';
                      case 'Ordered':
                      case 'Partially Received':
                        return 'info';
                      default:
                        return 'default';
                    }
                  };

                  return (
                    <tr key={po.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 font-mono text-sm block">{po.poNumber}</span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">{po.issueDate}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>{po.supplierName}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-700 font-medium">{po.warehouseName}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                        ${po.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {po.itemsCount} Units
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={getStatusBadge(po.status) as any}>{po.status}</Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {po.status !== 'Received' ? (
                          <button
                            onClick={() => handleReceivePO(po.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors"
                          >
                            Receive Stock
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center justify-end gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Stocked
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create PO Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Issue Purchase Order (PO)"
        description="Build replenishment lines and dispatch commercial contract to wholesale vendor."
        maxWidth="lg"
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreatePO}>
              Dispatch PO (${poGrandTotal.toFixed(2)})
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreatePO} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Supplier Vendor"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              options={mockSuppliers.map((s) => ({ value: s.id, label: s.name }))}
            />
            <Select
              label="Destination Warehouse"
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
              options={[
                { value: 'Colon Free Zone Distribution Center', label: 'Colon Free Zone DC' },
                { value: 'Calle 50 Store Vault & Staging', label: 'Calle 50 Store Vault' },
                { value: 'Multiplaza Mall Branch Vault', label: 'Multiplaza Vault' }
              ]}
            />
          </div>

          {/* Line items builder */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-700">Order Line Items</label>
            {lines.map((l, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={l.productName}
                  onChange={(e) => {
                    const updated = [...lines];
                    updated[i].productName = e.target.value;
                    setLines(updated);
                  }}
                  className="px-2 py-1 rounded-lg border border-slate-300 bg-white"
                  placeholder="Item"
                />
                <input
                  type="number"
                  min="1"
                  value={l.quantity}
                  onChange={(e) => {
                    const updated = [...lines];
                    updated[i].quantity = parseInt(e.target.value, 10) || 1;
                    setLines(updated);
                  }}
                  className="px-2 py-1 rounded-lg border border-slate-300 bg-white"
                  placeholder="Qty"
                />
                <input
                  type="number"
                  step="0.01"
                  value={l.unitCost}
                  onChange={(e) => {
                    const updated = [...lines];
                    updated[i].unitCost = parseFloat(e.target.value) || 0;
                    setLines(updated);
                  }}
                  className="px-2 py-1 rounded-lg border border-slate-300 bg-white"
                  placeholder="Cost"
                />
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Lines Subtotal:</span>
              <span>${poSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Import / ITBMS Tax:</span>
              <span>${poTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 text-sm pt-1 border-t border-slate-200">
              <span>Grand Total PO:</span>
              <span>${poGrandTotal.toFixed(2)}</span>
            </div>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
