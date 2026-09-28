'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Warehouse, StockMovement } from '@/types/saas';
import { mockWarehouses } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  Building2,
  Package,
  Plus,
  ArrowRight,
  RefreshCw,
  Search,
  CheckCircle,
  Truck
} from '@/components/icons';

export default function InventoryWarehousesPage() {
  const { products } = useSaaS();
  const { success } = useToast();

  const [warehouses, setWarehouses] = useState<Warehouse[]>(mockWarehouses);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>(mockWarehouses[0]);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  // Transfer Form
  const [transferProduct, setTransferProduct] = useState(products[0]?.name || 'UltraBook Pro X1 Carbon');
  const [fromLocation, setFromLocation] = useState('Colon Free Zone Distribution Center');
  const [toLocation, setToLocation] = useState('Calle 50 Store Vault & Staging');
  const [transferQty, setTransferQty] = useState('10');

  // Simulated bin locations in selected warehouse
  const binLocations = [
    { code: 'A1-R02-S04', zone: 'High Value Tech', item: 'UltraBook Pro X1 Carbon', stock: 18, capacity: 30 },
    { code: 'A2-R01-S01', zone: 'Audio & Studio', item: 'AcousticPure Wireless Headphones', stock: 45, capacity: 50 },
    { code: 'A3-R04-S02', zone: 'Wearables', item: 'OmniSmart Watch Series 5', stock: 12, capacity: 40 },
    { code: 'B1-R01-S05', zone: 'Displays', item: 'VisionPro Ultra 4K Display', stock: 6, capacity: 15 },
    { code: 'B2-R03-S01', zone: 'Cables & Docks', item: 'Thunderbolt 4 Pro Dock', stock: 28, capacity: 60 }
  ];

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransferOpen(false);
    success(
      'Stock Transfer Dispatched',
      `Transferred ${transferQty} units of ${transferProduct} from ${fromLocation.split(' ')[0]} to ${toLocation.split(' ')[0]}.`
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Warehouses & Bin Locations</h1>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200">
                {warehouses.length} Active Fulfillment Centers
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Multi-facility storage facilities, aisle/rack/shelf location tags, and inter-branch logistics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Truck className="w-4 h-4" />}
              onClick={() => setIsTransferOpen(true)}
            >
              Transfer Stock Between Warehouses
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/inventory" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/inventory/products" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Stock Valuation & Adjustments
          </Link>
          <Link href="/inventory/warehouses" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Warehouses & Bin Maps
          </Link>
        </div>

        {/* Warehouse Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {warehouses.map((wh) => {
            const isSelected = selectedWarehouse.id === wh.id;
            return (
              <div
                key={wh.id}
                onClick={() => setSelectedWarehouse(wh)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/40 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {wh.type}
                    </span>
                    <Badge variant={wh.status === 'Active' ? 'success' : 'default'} size="sm">
                      {wh.status}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{wh.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{wh.address}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Utilization Capacity:</span>
                  <span className="font-bold font-mono text-slate-900">{wh.capacity}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bin Location Mapping Section for Selected Warehouse */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Aisle, Rack & Shelf Bin Locations</span>
                <span className="text-xs font-normal text-slate-500">({selectedWarehouse.name})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Exact physical coordinates mapped for barcode pick-and-pack fulfillment.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
              5 Active Staging Bins
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Bin Code</th>
                  <th className="py-3 px-4">Warehouse Zone</th>
                  <th className="py-3 px-4">Stored Item</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Bin Capacity</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {binLocations.map((b) => (
                  <tr key={b.code} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{b.code}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{b.zone}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{b.item}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{b.stock} Units</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">Max {b.capacity}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Available
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inter-Warehouse Transfer Modal */}
      <Modal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        title="Inter-Warehouse Stock Transfer"
        description="Dispatch inventory between physical warehouses or retail store vaults."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsTransferOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleExecuteTransfer}>
              Execute Transfer
            </Button>
          </div>
        }
      >
        <form onSubmit={handleExecuteTransfer} className="space-y-4 text-xs">
          <Select
            label="Product to Transfer"
            value={transferProduct}
            onChange={(e) => setTransferProduct(e.target.value)}
            options={products.map((p) => ({ value: p.name, label: `${p.name} (${p.stock} avail)` }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Source Origin Warehouse"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              options={warehouses.map((w) => ({ value: w.name, label: w.name }))}
            />
            <Select
              label="Destination Facility"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              options={warehouses.map((w) => ({ value: w.name, label: w.name }))}
            />
          </div>

          <Input
            label="Transfer Quantity (Units)"
            type="number"
            min="1"
            required
            value={transferQty}
            onChange={(e) => setTransferQty(e.target.value)}
          />
        </form>
      </Modal>
    </AppShell>
  );
}
