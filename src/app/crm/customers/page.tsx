'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Customer } from '@/types/saas';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Receipt,
  CheckCircle,
  Eye,
  Star,
  ExternalLink,
  ChevronRight
} from '@/components/icons';

export default function CrmCustomersPage() {
  const { customers, addCustomer, currentBusiness } = useSaaS();
  const { success, info } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Customer Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [segment, setSegment] = useState<'VIP' | 'Regular' | 'Corporate'>('Corporate');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);
    const matchesSegment = filterType === 'All' || c.segment === filterType;
    return matchesSearch && matchesSegment;
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCust: Customer = {
      id: `cust_${Date.now()}`,
      businessId: currentBusiness.id,
      name,
      email,
      phone,
      city: 'Panama City',
      country: 'Panama',
      status: 'active',
      tags: [segment],
      notesCount: 0,
      assignedTo: 'Sales Team',
      segment,
      totalSpent: 0,
      ordersCount: 0,
      lastOrderDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    addCustomer(newCust);
    setIsAddOpen(false);
    setName('');
    setEmail('');
    setPhone('');
    success('Customer Added', `Customer record for ${newCust.name} has been enrolled.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Customer 360 Directory</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {customers.length} Profiles
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Unify in-store retail shoppers, web buyers, corporate B2B clients, and VIP loyalty balances.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddOpen(true)}
            >
              Add Customer
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/crm" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/crm/customers" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Customers 360
          </Link>
          <Link href="/crm/leads" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Leads
          </Link>
          <Link href="/crm/pipeline" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Deals Pipeline
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['All', 'Corporate', 'VIP', 'Regular'].map((seg) => (
              <button
                key={seg}
                onClick={() => setFilterType(seg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === seg
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Client Name & Contacts</th>
                  <th className="py-3.5 px-4">Segment</th>
                  <th className="py-3.5 px-4">Lifetime Spend</th>
                  <th className="py-3.5 px-4">Orders Count</th>
                  <th className="py-3.5 px-4">Last Activity</th>
                  <th className="py-3.5 px-4 text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    onClick={() => setSelectedCustomer(cust)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {cust.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{cust.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>{cust.email}</span>
                            <span>•</span>
                            <span className="font-mono">{cust.phone}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          cust.segment === 'VIP'
                            ? 'warning'
                            : cust.segment === 'Corporate'
                            ? 'info'
                            : 'default'
                        }
                      >
                        {cust.segment}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                      ${cust.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {cust.ordersCount} Orders
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {cust.lastOrderDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(cust);
                        }}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer 360 Drawer */}
      {selectedCustomer && (
        <Drawer
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={selectedCustomer.name}
          description={`Customer ID: ${selectedCustomer.id}`}
          width="xl"
          footer={
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
                className="flex-1"
              >
                Close Dossier
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  info('WhatsApp Initiated', `Opening chat session for ${selectedCustomer.phone}...`);
                }}
                className="flex-1"
              >
                WhatsApp Chat
              </Button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Top metrics summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
                <p className="text-slate-500 text-[11px]">Total Lifetime Value</p>
                <p className="text-xl font-bold font-mono text-blue-900 mt-1">
                  ${selectedCustomer.totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-slate-500 text-[11px]">Total Orders Placed</p>
                <p className="text-xl font-bold font-mono text-slate-900 mt-1">
                  {selectedCustomer.ordersCount}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Direct Contacts & Panama Verification
              </p>
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-mono">{selectedCustomer.phone}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Panama Fiscal RUC:</span>
                  <span className="font-mono font-semibold text-slate-800">155789012-2-2021 DV 44</span>
                </div>
              </div>
            </div>

            {/* Loyalty Points Balance */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-300 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                  Loyalty Points Balance
                </span>
                <p className="text-lg font-black text-amber-900 font-mono mt-0.5">850 Points ($8.50 Credit)</p>
              </div>
              <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
                Gold Tier
              </span>
            </div>

            {/* Recent Communication Logs */}
            <div className="space-y-2">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Omnichannel Activity Stream
              </p>
              <div className="space-y-2">
                {[
                  { title: 'In-store POS Purchase (Multiplaza)', time: 'Yesterday 3:15 PM', desc: 'Bought AcousticPure Wireless Headphones ($349.50) via Yappy' },
                  { title: 'WhatsApp Promo Campaign Opened', time: '3 days ago', desc: 'Clicked link for Weekend Audio Sale' },
                  { title: 'DGI Fiscal Factura Transmitted', time: '1 week ago', desc: 'CUFE #9910-4491 generated and emailed automatically' }
                ].map((act, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px]">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{act.title}</span>
                      <span className="text-slate-400 font-normal">{act.time}</span>
                    </div>
                    <p className="text-slate-500 mt-1">{act.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Customer Profile"
        description="Enroll a new retail client, wholesale buyer, or enterprise corporate contact."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateCustomer}>
              Create Customer
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
          <Input
            label="Full Name or Business Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Corporacion Banistmo S.A."
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contact@banistmo.pa"
          />

          <Input
            label="Phone / WhatsApp Contact"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+507 6844-2200"
          />

          <Select
            label="Customer Segment Tier"
            value={segment}
            onChange={(e) => setSegment(e.target.value as any)}
            options={[
              { value: 'Corporate', label: 'Corporate B2B Account' },
              { value: 'VIP', label: 'VIP High-Volume Shopper' },
              { value: 'Regular', label: 'Standard Retail Shopper' }
            ]}
          />
        </form>
      </Modal>
    </AppShell>
  );
}
