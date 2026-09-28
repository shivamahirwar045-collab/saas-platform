'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Product } from '@/types/saas';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  RefreshCw,
  Sliders,
  CheckCircle,
  FileText
} from '@/components/icons';

export default function InventoryProductsPage() {
  const { products, updateProductStock } = useSaaS();
  const { success } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterLow, setFilterLow] = useState(false);

  // Stock Adjustment Modal
  const [adjustProduct, setAdjustProduct] = useState<Product | null>(null);
  const [adjustType, setAdjustType] = useState<'add' | 'remove'>('add');
  const [adjustQty, setAdjustQty] = useState('5');
  const [adjustReason, setAdjustReason] = useState('Physical Inventory Recount Audit');

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLow = filterLow ? p.stock <= p.minStockAlert : true;
    return matchesSearch && matchesLow;
  });

  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValuation = products.reduce((sum, p) => sum + p.stock * (p.costPrice || p.price * 0.65), 0);
  const lowStockCount = products.filter((p) => p.stock <= p.minStockAlert).length;

  const handleConfirmAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustProduct) return;

    const delta = (parseInt(adjustQty, 10) || 0) * (adjustType === 'add' ? 1 : -1);
    const newStock = Math.max(0, adjustProduct.stock + delta);
    updateProductStock(adjustProduct.id, newStock);
    setAdjustProduct(null);
    success(
      'Stock Adjusted',
      `Updated ${adjustProduct.name} stock to ${newStock} units (${adjustReason}).`
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Stock Reserves & Valuation</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                ${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2 })} Total Asset Value
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time multi-warehouse balances, reorder trigger alerts, and stock reconciliation adjustments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/purchasing">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<FileText className="w-3.5 h-3.5" />}
              >
                Create Purchase Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/inventory" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/inventory/products" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Stock Valuation & Adjustments
          </Link>
          <Link href="/inventory/warehouses" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Warehouses & Bin Maps
          </Link>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by SKU or item name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterLow(!filterLow)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                filterLow
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Low Safety Buffer ({lowStockCount})</span>
            </button>
          </div>
        </div>

        {/* Stock Items Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Item & SKU</th>
                  <th className="py-3.5 px-4">Available Units</th>
                  <th className="py-3.5 px-4">Reserved (Orders)</th>
                  <th className="py-3.5 px-4">Safety Buffer</th>
                  <th className="py-3.5 px-4">Unit Cost</th>
                  <th className="py-3.5 px-4">Total Asset Valuation</th>
                  <th className="py-3.5 px-4 text-right">Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((prod) => {
                  const isLow = prod.stock <= prod.minStockAlert;
                  const estimatedCost = prod.costPrice || prod.price * 0.65;
                  const totalItemVal = prod.stock * estimatedCost;

                  return (
                    <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900 text-sm">{prod.name}</p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">{prod.sku}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold text-sm ${isLow ? 'text-rose-600' : 'text-slate-900'}`}>
                            {prod.stock}
                          </span>
                          {isLow && (
                            <Badge variant="danger" size="sm">
                              Low Stock Buffer
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        {Math.floor(prod.stock * 0.15)} Units
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        Min {prod.minStockAlert} Units
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        ${estimatedCost.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                        ${totalItemVal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setAdjustProduct(prod)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
                        >
                          Adjust Count
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Adjust Modal */}
      {adjustProduct && (
        <Modal
          isOpen={!!adjustProduct}
          onClose={() => setAdjustProduct(null)}
          title={`Adjust Inventory: ${adjustProduct.name}`}
          description={`Current System Count: ${adjustProduct.stock} units`}
          maxWidth="sm"
          footer={
            <div className="flex gap-2 w-full">
              <Button variant="outline" size="sm" onClick={() => setAdjustProduct(null)} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmAdjust} className="flex-1">
                Confirm Count
              </Button>
            </div>
          }
        >
          <form onSubmit={handleConfirmAdjust} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAdjustType('add')}
                className={`p-2.5 rounded-xl border text-center font-bold ${
                  adjustType === 'add'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Stock Inflow (+)
              </button>
              <button
                type="button"
                onClick={() => setAdjustType('remove')}
                className={`p-2.5 rounded-xl border text-center font-bold ${
                  adjustType === 'remove'
                    ? 'border-rose-600 bg-rose-50 text-rose-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Stock Outflow (-)
              </button>
            </div>

            <Input
              label="Quantity of Units"
              type="number"
              min="1"
              required
              value={adjustQty}
              onChange={(e) => setAdjustQty(e.target.value)}
            />

            <Select
              label="Adjustment Reason"
              value={adjustReason}
              onChange={(e) => setAdjustReason(e.target.value)}
              options={[
                { value: 'Physical Inventory Recount Audit', label: 'Physical Inventory Recount Audit' },
                { value: 'Damaged / Defective Stock Write-off', label: 'Damaged / Defective Stock Write-off' },
                { value: 'Customer Return Restocking', label: 'Customer Return Restocking' },
                { value: 'Supplier Direct Sample Received', label: 'Supplier Direct Sample Received' }
              ]}
            />
          </form>
        </Modal>
      )}
    </AppShell>
  );
}
