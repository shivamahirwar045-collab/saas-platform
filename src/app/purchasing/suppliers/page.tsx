'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Supplier } from '@/types/saas';
import { mockSuppliers } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  Building2,
  Search,
  Plus,
  Mail,
  Phone,
  Clock,
  Star,
  FileText,
  CheckCircle,
  Truck
} from '@/components/icons';

export default function PurchasingSuppliersPage() {
  const { success } = useToast();

  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Supplier Form
  const [name, setName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Hardware & Components');
  const [leadTimeDays, setLeadTimeDays] = useState('7');
  const [paymentTerms, setPaymentTerms] = useState('Net 30');

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSup: Supplier = {
      id: `sup_${Date.now()}`,
      name,
      contactName,
      email,
      phone,
      category,
      leadTimeDays: parseInt(leadTimeDays, 10) || 7,
      rating: 5.0,
      paymentTerms,
      status: 'Active',
      createdAt: new Date().toISOString()
    };
    setSuppliers([...suppliers, newSup]);
    setIsAddOpen(false);
    setName('');
    setContactName('');
    setEmail('');
    setPhone('');
    success('Supplier Registered', `"${newSup.name}" added to approved vendor list.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Suppliers & Vendor Directory</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {suppliers.length} Approved Vendors
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Maintain supplier contract lead times, commercial terms, and import contacts for stock replenishment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/purchasing/orders">
              <Button variant="outline" size="sm">
                Purchase Orders
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddOpen(true)}
            >
              Add Supplier
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/purchasing" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/purchasing/suppliers" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Suppliers
          </Link>
          <Link href="/purchasing/orders" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Purchase Orders
          </Link>
        </div>

        {/* Search bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by vendor name, category, or representative..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Showing {filtered.length} of {suppliers.length}
          </span>
        </div>

        {/* Suppliers Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Vendor & Category</th>
                  <th className="py-3.5 px-4">Representative</th>
                  <th className="py-3.5 px-4">Lead Time</th>
                  <th className="py-3.5 px-4">Payment Terms</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((sup) => (
                  <tr key={sup.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>{sup.name}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{sup.category}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900">{sup.contactName}</p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{sup.email}</span>
                        <span>•</span>
                        <span className="font-mono">{sup.phone}</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                      {sup.leadTimeDays} Days Avg
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {sup.paymentTerms}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-amber-500 font-bold font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{sup.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="success" size="sm">
                        {sup.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/purchasing/orders"
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors inline-block"
                      >
                        Create PO →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Supplier Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Approved Supplier"
        description="Register a wholesale importer or factory supplier in your vendor directory."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Register Vendor
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <Input
            label="Supplier Legal / Commercial Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Foxconn Global Logistics Panama"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Person"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. David Lin"
            />
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="d.lin@foxconn.pa"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+507 430-8800"
            />
            <Input
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Audio & Studio"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Lead Time (Days)"
              type="number"
              value={leadTimeDays}
              onChange={(e) => setLeadTimeDays(e.target.value)}
            />
            <Select
              label="Payment Terms"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              options={[
                { value: 'Net 30', label: 'Net 30 Days' },
                { value: 'Net 60', label: 'Net 60 Days' },
                { value: 'Cash in Advance', label: 'Cash in Advance (100% Prepay)' },
                { value: '50% Deposit / 50% Delivery', label: '50% Deposit / 50% Delivery' }
              ]}
            />
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
