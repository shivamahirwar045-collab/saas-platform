'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { PaymentTransaction, PaymentLink } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  CreditCard,
  Plus,
  Link2,
  Share2,
  RefreshCw,
  Search,
  Check,
  X,
  FileText,
  Phone,
  Mail,
  Clock,
  ArrowRight
} from '@/components/icons';
import { mockTransactions } from '@/data/mockData';

export default function PaymentsPage() {
  const { paymentLinks, createPaymentLink, currentBusiness } = useSaaS();
  const [activeTab, setActiveTab] = useState<'transactions' | 'links' | 'recurring'>('transactions');

  // New Payment Link Modal
  const [isNewLinkOpen, setIsNewLinkOpen] = useState(false);
  const [linkForm, setLinkForm] = useState({
    title: '',
    amount: 250.00,
    description: '',
    customerName: ''
  });

  // Share Modal
  const [sharedLink, setSharedLink] = useState<PaymentLink | null>(null);

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkForm.title) return;
    createPaymentLink({
      title: linkForm.title,
      amount: Number(linkForm.amount),
      description: linkForm.description || 'Commercial settlement invoice',
      customerName: linkForm.customerName
    });
    setIsNewLinkOpen(false);
  };

  // Transactions Table Columns
  const transactionColumns: Column<PaymentTransaction>[] = [
    {
      header: 'Txn #',
      cell: (t) => (
        <div>
          <span className="font-bold text-slate-900">{t.transactionNumber}</span>
          <p className="text-[10px] text-slate-400 font-mono">Ref: {t.referenceId}</p>
        </div>
      )
    },
    {
      header: 'Customer',
      accessorKey: 'customerName'
    },
    {
      header: 'Amount',
      cell: (t) => (
        <span className="font-extrabold text-slate-900">
          ${t.amount.toFixed(2)} {t.currency}
        </span>
      )
    },
    {
      header: 'Method',
      cell: (t) => (
        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
          {t.method}
        </span>
      )
    },
    {
      header: 'Gateway Adapter',
      accessorKey: 'gateway'
    },
    {
      header: 'Status',
      cell: (t) => (
        <Badge
          variant={
            t.status === 'Successful'
              ? 'success'
              : t.status === 'Pending'
              ? 'warning'
              : t.status === 'Failed'
              ? 'danger'
              : 'default'
          }
        >
          {t.status}
        </Badge>
      )
    },
    {
      header: 'Date',
      accessorKey: 'createdAt'
    }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Payments &amp; Payment Links
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gateway adapters, one-click WhatsApp payment URLs, automated reconciliation, and recurring billing.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsNewLinkOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Payment Link</span>
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Processed (30d)"
            value="$184,290"
            change="16.4%"
            isPositive={true}
            subtitle="Across 4 active gateways"
            icon={<CreditCard className="w-5 h-5" />}
          />
          <StatCard
            title="Payment Links Volume"
            value="$45,600"
            subtitle="Direct WhatsApp &amp; B2B shares"
            icon={<Link2 className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Gateway Success Rate"
            value="98.8%"
            change="0.4%"
            isPositive={true}
            subtitle="Low dispute threshold"
            icon={<Check className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Pending Settling Funds"
            value="$4,120.00"
            subtitle="Yappy &amp; ACH transfers"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'transactions' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Transactions Log ({mockTransactions.length})
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'links' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Link2 className="w-4 h-4" /> Payment Links Builder ({paymentLinks.length})
          </button>
          <button
            onClick={() => setActiveTab('recurring')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'recurring' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-4 h-4" /> Recurring Subscriptions (14)
          </button>
        </div>

        {/* TAB 1: TRANSACTIONS TABLE */}
        {activeTab === 'transactions' && (
          <DataTable
            data={mockTransactions}
            columns={transactionColumns}
            searchPlaceholder="Search transactions by reference or customer..."
            title="Settled &amp; Pending Transactions"
            subtitle="Direct synchronization with Panama PAC e-invoices"
          />
        )}

        {/* TAB 2: PAYMENT LINKS BUILDER */}
        {activeTab === 'links' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentLinks.map(pl => (
                <div
                  key={pl.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                        {pl.code}
                      </span>
                      <Badge variant={pl.status === 'paid' ? 'success' : 'info'}>
                        {pl.status.toUpperCase()}
                      </Badge>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{pl.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{pl.description}</p>
                    {pl.customerName && (
                      <p className="text-[11px] text-slate-400">Target: {pl.customerName}</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">${pl.amount.toFixed(2)}</span>
                      <p className="text-[10px] text-slate-400">Expires: {pl.expiresAt}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(`https://pay.acmeretail.com/${pl.code}`);
                          alert(`Payment URL copied to clipboard: https://pay.acmeretail.com/${pl.code}`);
                        }}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => setSharedLink(pl)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                        title="Share via WhatsApp / Email"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RECURRING */}
        {activeTab === 'recurring' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Recurring B2B Subscriptions &amp; Retainers</h3>
            <div className="divide-y divide-slate-100">
              {[
                { customer: 'Inversiones Balboa S.A.', plan: 'Enterprise IT Support Retainer', cycle: 'Monthly ($1,500/mo)', nextDate: 'Oct 15, 2026', status: 'Active' },
                { customer: 'Castillero & Asociados', plan: 'Audio-Visual Workstation Lease', cycle: 'Monthly ($850/mo)', nextDate: 'Nov 01, 2026', status: 'Active' },
                { customer: 'Panama Canal Law Group', plan: 'Executive Ergonomic Hardware Service', cycle: 'Quarterly ($2,400/qtr)', nextDate: 'Dec 01, 2026', status: 'Active' }
              ].map((sub, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{sub.customer}</p>
                    <p className="text-[11px] text-slate-500">{sub.plan} • {sub.cycle}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">Next Auto-PAC: {sub.nextDate}</span>
                    <Badge variant="success">{sub.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: CREATE PAYMENT LINK */}
        {isNewLinkOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Create Direct Payment Link</h3>
                <button onClick={() => setIsNewLinkOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateLink} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Link Title / Item Purpose *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ergonomic Chairs Deposit - Invoice 0893"
                    value={linkForm.title}
                    onChange={e => setLinkForm({ ...linkForm, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Amount ($ USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={linkForm.amount}
                      onChange={e => setLinkForm({ ...linkForm, amount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Target Customer</label>
                    <input
                      type="text"
                      placeholder="e.g. Inversiones Balboa"
                      value={linkForm.customerName}
                      onChange={e => setLinkForm({ ...linkForm, customerName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Description / Line Items</label>
                  <textarea
                    rows={2}
                    placeholder="Specify contract details or payment terms..."
                    value={linkForm.description}
                    onChange={e => setLinkForm({ ...linkForm, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsNewLinkOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-semibold shadow-xs"
                  >
                    Generate Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: SHARE OPTIONS */}
        {sharedLink && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Share Payment Link</h3>
                <button onClick={() => setSharedLink(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-slate-800">{sharedLink.title}</p>
                <p className="font-mono text-xs bg-slate-100 p-2 rounded-lg text-slate-700 break-all">
                  https://pay.acmeretail.com/{sharedLink.code}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    alert(`Simulated WhatsApp message dispatched for ${sharedLink.code}`);
                    setSharedLink(null);
                  }}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
                </button>
                <button
                  onClick={() => {
                    alert(`Simulated Email invoice sent with payment link.`);
                    setSharedLink(null);
                  }}
                  className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-xl font-bold flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" /> Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
