'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { PaymentTransaction } from '@/types/saas';
import { mockTransactions } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  CreditCard,
  Search,
  RefreshCw,
  Receipt,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Download,
  Filter
} from '@/components/icons';

export default function PaymentTransactionsPage() {
  const { success, warning, info } = useToast();

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [gatewayFilter, setGatewayFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Refund Modal
  const [refundTxn, setRefundTxn] = useState<PaymentTransaction | null>(null);
  const [refundAmount, setRefundAmount] = useState('0');
  const [refundReason, setRefundReason] = useState('Customer Return / Cancellation');

  // Dispute Modal
  const [disputeTxn, setDisputeTxn] = useState<PaymentTransaction | null>(null);

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.reference && t.reference.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGateway = gatewayFilter === 'All' || t.gateway === gatewayFilter;
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesGateway && matchesStatus;
  });

  const handleProcessRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundTxn) return;

    const amt = parseFloat(refundAmount) || 0;
    const updated = transactions.map((t) =>
      t.id === refundTxn.id ? { ...t, status: 'Refunded' as const } : t
    );
    setTransactions(updated);
    setRefundTxn(null);
    warning('Refund Issued', `Processed refund of $${amt.toFixed(2)} via ${refundTxn.gateway}.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Transactions & Gateway Settlements</h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Settlements Live
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Unified payment transaction ledger across Stripe, Yappy Panama, Authorize.Net, and cash tender.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={() => info('Export Started', 'Compiling CSV archive of payment settlement transactions...')}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/payments" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/payments/links" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Payment Links
          </Link>
          <Link href="/payments/transactions" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Transactions & Refunds
          </Link>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by transaction ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Gateway Filter */}
            <select
              value={gatewayFilter}
              onChange={(e) => setGatewayFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
            >
              <option value="All">All Gateways</option>
              <option value="Stripe">Stripe Card</option>
              <option value="Yappy">Yappy Panama</option>
              <option value="Authorize.Net">Authorize.Net</option>
              <option value="Cash">Cash Till</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Succeeded">Succeeded</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Txn ID & Date</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Gateway</th>
                  <th className="py-3.5 px-4">Gross Amount</th>
                  <th className="py-3.5 px-4">Fee Breakdown</th>
                  <th className="py-3.5 px-4">Net Payout</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((t) => {
                  const getStatusBadge = (st: string) => {
                    switch (st) {
                      case 'Succeeded':
                        return 'success';
                      case 'Processing':
                        return 'info';
                      case 'Refunded':
                        return 'warning';
                      case 'Failed':
                        return 'danger';
                      default:
                        return 'default';
                    }
                  };

                  const fee = (t as any).fee ?? Math.round((t.amount * 0.025 + 0.25) * 100) / 100;
                  const net = (t as any).net ?? Math.round((t.amount - fee) * 100) / 100;

                  return (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 font-mono text-sm block">{t.id}</span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">{t.customerName}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {t.gateway}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                        ${t.amount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                        -${fee.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 text-sm">
                        ${net.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={getStatusBadge(t.status) as any}>{t.status}</Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {t.status === 'Succeeded' && (
                          <button
                            onClick={() => {
                              setRefundTxn(t);
                              setRefundAmount(t.amount.toFixed(2));
                            }}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                          >
                            Refund
                          </button>
                        )}
                        {t.status === 'Refunded' && (
                          <span className="text-[11px] text-slate-400 font-mono">Refund Settled</span>
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

      {/* Refund Modal */}
      {refundTxn && (
        <Modal
          isOpen={!!refundTxn}
          onClose={() => setRefundTxn(null)}
          title="Process Transaction Refund"
          description={`Original Transaction: ${refundTxn.id} via ${refundTxn.gateway}`}
          footer={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setRefundTxn(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleProcessRefund}>
                Confirm Refund
              </Button>
            </div>
          }
        >
          <form onSubmit={handleProcessRefund} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-900">{refundTxn.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Original Total Charged:</span>
                <span className="font-mono font-bold text-slate-900">${refundTxn.amount.toFixed(2)}</span>
              </div>
            </div>

            <Input
              label="Refund Amount ($ USD)"
              type="number"
              step="0.01"
              max={refundTxn.amount}
              required
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              helperText="Can be partial or full amount"
            />

            <Select
              label="Reason for Refund"
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              options={[
                { value: 'Customer Return / Cancellation', label: 'Customer Return / Cancellation' },
                { value: 'Defective Product / Exchange', label: 'Defective Product / Exchange' },
                { value: 'Duplicate Charge / Overbilling', label: 'Duplicate Charge / Overbilling' },
                { value: 'Fraud / Unauthorized Transaction', label: 'Fraud / Unauthorized Transaction' }
              ]}
            />
          </form>
        </Modal>
      )}
    </AppShell>
  );
}
