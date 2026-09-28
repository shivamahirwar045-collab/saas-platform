'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Product, Warehouse, StockMovement } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  Package,
  Building2,
  RefreshCw,
  AlertTriangle,
  Plus,
  ArrowRight,
  Search,
  Check,
  X,
  Sliders
} from '@/components/icons';
import { mockWarehouses } from '@/data/mockData';

export default function InventoryPage() {
  const { products, updateProductStock, currentBusiness } = useSaaS();
  const [activeTab, setActiveTab] = useState<'items' | 'warehouses' | 'movements'>('items');
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  // Transfer form
  const [transferForm, setTransferForm] = useState({
    productId: products[0]?.id || '',
    fromWarehouse: 'Colon Free Zone Distribution Center',
    toWarehouse: 'Calle 50 Store Vault & Staging',
    quantity: 5
  });

  const [movements, setMovements] = useState<StockMovement[]>([
    {
      id: 'mov_01',
      productId: 'prod_01',
      productName: 'UltraBook Pro X1 Carbon',
      sku: 'UBX1-32-1TB',
      type: 'Sale',
      quantity: 1,
      fromLocation: 'Calle 50 Store Vault',
      toLocation: 'Order ORD-2026-0891',
      reason: 'Omnichannel Website Checkout',
      performedBy: 'Automated Sync',
      timestamp: 'Today 09:14'
    },
    {
      id: 'mov_02',
      productId: 'prod_02',
      productName: 'AcousticPure Wireless Headphones',
      sku: 'APN-800-BLK',
      type: 'Transfer',
      quantity: 10,
      fromLocation: 'Colon Free Zone DC',
      toLocation: 'Multiplaza Mall Branch',
      reason: 'Weekend Retail Stocking',
      performedBy: 'Ricardo Mendez',
      timestamp: 'Yesterday 14:30'
    },
    {
      id: 'mov_03',
      productId: 'prod_06',
      productName: 'CloudSync Mini POS Thermal Printer',
      sku: 'CSP-80-THM',
      type: 'Inbound',
      quantity: 35,
      fromLocation: 'Supplier PO-2026-0343',
      toLocation: 'Calle 50 Store Vault',
      reason: 'Supplier Receiving',
      performedBy: 'Elena Rostova',
      timestamp: 'Sep 20, 2026'
    }
  ]);

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === transferForm.productId);
    if (!prod) return;

    const newMov: StockMovement = {
      id: `mov_${Date.now()}`,
      productId: prod.id,
      productName: prod.name,
      sku: prod.sku,
      type: 'Transfer',
      quantity: Number(transferForm.quantity),
      fromLocation: transferForm.fromWarehouse,
      toLocation: transferForm.toWarehouse,
      reason: 'Inter-branch stock rebalance',
      performedBy: 'Alexander Sterling',
      timestamp: 'Just now'
    };

    setMovements([newMov, ...movements]);
    setIsTransferOpen(false);
    alert(`Transfer of ${transferForm.quantity} units of ${prod.name} recorded!`);
  };

  const totalStockUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStockAlert).length;
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const productColumns: Column<Product>[] = [
    {
      header: 'Item & SKU',
      cell: (p) => (
        <div>
          <p className="font-bold text-slate-900">{p.name}</p>
          <p className="text-[11px] text-slate-400 font-mono">SKU: {p.sku}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    {
      header: 'Available Units',
      cell: (p) => (
        <span className={`font-bold ${p.stock <= p.minStockAlert ? 'text-rose-600' : 'text-slate-900'}`}>
          {p.stock} units
        </span>
      )
    },
    {
      header: 'Safety Min',
      cell: (p) => <span className="text-slate-500">{p.minStockAlert} units</span>
    },
    {
      header: 'Estimated Asset Value',
      cell: (p) => <span className="font-bold text-slate-800">${(p.price * p.stock).toFixed(2)}</span>
    },
    {
      header: 'Status',
      cell: (p) => (
        <Badge variant={p.stock <= p.minStockAlert ? 'danger' : 'success'}>
          {p.stock <= p.minStockAlert ? 'Low Stock Warning' : 'Healthy Stock'}
        </Badge>
      )
    },
    {
      header: 'Quick Adjust',
      cell: (p) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateProductStock(p.id, Math.max(0, p.stock - 1))}
            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
          >
            -
          </button>
          <button
            onClick={() => updateProductStock(p.id, p.stock + 1)}
            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
          >
            +
          </button>
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
              Inventory &amp; Multi-Warehouse Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time stock valuation across Colon Free Zone hub, store vaults, and inter-branch transfers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsTransferOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Transfer Stock</span>
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Stock Value"
            value={`$${(totalInventoryValue / 1000).toFixed(1)}k`}
            subtitle="Wholesale asset valuation"
            icon={<Package className="w-5 h-5" />}
          />
          <StatCard
            title="Total Units on Hand"
            value={`${totalStockUnits} Units`}
            subtitle="Across all locations"
            icon={<Building2 className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Low Stock Alerts"
            value={`${lowStockCount} Items`}
            change="Reorder Needed"
            isPositive={false}
            subtitle="Below safety threshold"
            icon={<AlertTriangle className="w-5 h-5" />}
            iconBg="bg-rose-50 text-rose-600"
          />
          <StatCard
            title="Active Warehouses"
            value="3 Locations"
            subtitle="Colon, Calle 50, Chiriqui"
            icon={<Building2 className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('items')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'items' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" /> Stock Items ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('warehouses')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'warehouses' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" /> Warehouses &amp; Depots ({mockWarehouses.length})
          </button>
          <button
            onClick={() => setActiveTab('movements')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'movements' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-4 h-4" /> Stock Movements ({movements.length})
          </button>
        </div>

        {/* TAB 1: STOCK ITEMS */}
        {activeTab === 'items' && (
          <DataTable
            data={products}
            columns={productColumns}
            searchPlaceholder="Search inventory by title or SKU..."
            title="Multi-Warehouse Inventory Ledger"
            subtitle="Connected to POS barcode lookups and online ecommerce catalog"
          />
        )}

        {/* TAB 2: WAREHOUSES */}
        {activeTab === 'warehouses' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockWarehouses.map(wh => (
              <div
                key={wh.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                    {wh.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{wh.utilizedPercent}% Capacity</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{wh.name}</h3>
                <p className="text-xs text-slate-500">Branch: {wh.branchName}</p>
                <p className="text-xs text-slate-500">Facility Manager: {wh.manager}</p>

                {/* Progress */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${wh.utilizedPercent}%` }}
                    className="bg-blue-600 h-full rounded-full"
                  ></div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                  <span>Storage Capacity:</span>
                  <span className="font-semibold text-slate-800">{wh.capacity.toLocaleString()} units</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: MOVEMENTS LOG */}
        {activeTab === 'movements' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Audit Trail of Stock Transfers &amp; Dispatches</h3>
            <div className="divide-y divide-slate-100">
              {movements.map(m => (
                <div key={m.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{m.productName}</span>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                        {m.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {m.fromLocation} → {m.toLocation} • Reason: {m.reason}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-sm">
                      {m.type === 'Inbound' ? '+' : '-'}{m.quantity} units
                    </span>
                    <p className="text-[10px] text-slate-400">{m.timestamp} by {m.performedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: TRANSFER STOCK */}
        {isTransferOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Transfer Inventory Between Warehouses</h3>
                <button onClick={() => setIsTransferOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleExecuteTransfer} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Item to Transfer</label>
                  <select
                    value={transferForm.productId}
                    onChange={e => setTransferForm({ ...transferForm, productId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.stock} units available)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Source Depot</label>
                    <select
                      value={transferForm.fromWarehouse}
                      onChange={e => setTransferForm({ ...transferForm, fromWarehouse: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    >
                      <option value="Colon Free Zone Distribution Center">Colon Free Zone DC</option>
                      <option value="Calle 50 Store Vault & Staging">Calle 50 Vault</option>
                      <option value="David Chiriqui Regional Depository">Chiriqui Depository</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Destination Depot</label>
                    <select
                      value={transferForm.toWarehouse}
                      onChange={e => setTransferForm({ ...transferForm, toWarehouse: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    >
                      <option value="Calle 50 Store Vault & Staging">Calle 50 Vault</option>
                      <option value="Multiplaza Pacific Mall Branch">Multiplaza Mall Branch</option>
                      <option value="David Chiriqui Regional Depository">Chiriqui Depository</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Transfer Quantity (Units)</label>
                  <input
                    type="number"
                    min="1"
                    value={transferForm.quantity}
                    onChange={e => setTransferForm({ ...transferForm, quantity: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsTransferOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-semibold shadow-xs"
                  >
                    Confirm Transfer
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
