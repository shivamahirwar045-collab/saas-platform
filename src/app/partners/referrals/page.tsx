'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  Share2,
  Users,
  CreditCard,
  Copy,
  ExternalLink,
  QrCode,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Download,
  Building2
} from '@/components/icons';

interface ReferralLedgerItem {
  id: string;
  orderNumber: string;
  partnerName: string;
  partnerCode: string;
  customerName: string;
  saleDate: string;
  orderAmount: number;
  commissionRate: number;
  commissionEarned: number;
  payoutStatus: 'Pending Review' | 'Approved' | 'Paid';
  payoutMethod?: string;
  fraudRisk: 'Low' | 'Medium' | 'Flagged';
}

const mockReferralLedger: ReferralLedgerItem[] = [
  {
    id: 'ref-tx-001',
    orderNumber: 'ORD-9941',
    partnerName: 'TechPanama Reviews',
    partnerCode: 'TECHPTY15',
    customerName: 'Corporación Logística del Pacífico',
    saleDate: '2026-09-28',
    orderAmount: 3450.00,
    commissionRate: 10,
    commissionEarned: 345.00,
    payoutStatus: 'Approved',
    payoutMethod: 'ACH Banco General',
    fraudRisk: 'Low'
  },
  {
    id: 'ref-tx-002',
    orderNumber: 'ORD-9938',
    partnerName: 'TechPanama Reviews',
    partnerCode: 'TECHPTY15',
    customerName: 'Distribuidora Bella Vista',
    saleDate: '2026-09-27',
    orderAmount: 1200.00,
    commissionRate: 10,
    commissionEarned: 120.00,
    payoutStatus: 'Approved',
    payoutMethod: 'ACH Banco General',
    fraudRisk: 'Low'
  },
  {
    id: 'ref-tx-003',
    orderNumber: 'ORD-9925',
    partnerName: 'Consultores Empresariales PTY',
    partnerCode: 'BIZPANAMA',
    customerName: 'Bufete Morales & Asociados',
    saleDate: '2026-09-26',
    orderAmount: 8900.00,
    commissionRate: 15,
    commissionEarned: 1335.00,
    payoutStatus: 'Paid',
    payoutMethod: 'ACH Banistmo',
    fraudRisk: 'Low'
  },
  {
    id: 'ref-tx-004',
    orderNumber: 'ORD-9912',
    partnerName: 'Carolina Mendez (Tech Lifestyle)',
    partnerCode: 'CAROPTY',
    customerName: 'Ricardo Varela',
    saleDate: '2026-09-25',
    orderAmount: 450.00,
    commissionRate: 12,
    commissionEarned: 54.00,
    payoutStatus: 'Pending Review',
    fraudRisk: 'Low'
  },
  {
    id: 'ref-tx-005',
    orderNumber: 'ORD-9905',
    partnerName: 'Panama Startups Hub',
    partnerCode: 'PTYSTARTUP',
    customerName: 'Fintech Solutions S.A.',
    saleDate: '2026-09-24',
    orderAmount: 5600.00,
    commissionRate: 10,
    commissionEarned: 560.00,
    payoutStatus: 'Paid',
    payoutMethod: 'Yappy Comercial',
    fraudRisk: 'Low'
  },
  {
    id: 'ref-tx-006',
    orderNumber: 'ORD-9889',
    partnerName: 'Descuentos PTY Daily',
    partnerCode: 'DAILYDEALS',
    customerName: 'Anonymous Shopper',
    saleDate: '2026-09-23',
    orderAmount: 180.00,
    commissionRate: 8,
    commissionEarned: 14.40,
    payoutStatus: 'Pending Review',
    fraudRisk: 'Medium'
  }
];

export default function PartnerReferralsPage() {
  const { addToast } = useToast();
  const [ledger, setLedger] = useState<ReferralLedgerItem[]>(mockReferralLedger);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Payout Batch Modal
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutRail, setPayoutRail] = useState('ACH_BG');
  const [processingPayout, setProcessingPayout] = useState(false);

  // Link Generator Simulator
  const [customPartnerCode, setCustomPartnerCode] = useState('TECHPTY15');
  const [customCampaignTag, setCustomCampaignTag] = useState('cyberweek');

  const filteredItems = ledger.filter(item => {
    const matchesSearch = item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.partnerCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.payoutStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalReferredGross = ledger.reduce((acc, i) => acc + i.orderAmount, 0);
  const totalCommissionEarned = ledger.reduce((acc, i) => acc + i.commissionEarned, 0);
  const totalApprovedUnpaid = ledger.filter(i => i.payoutStatus === 'Approved').reduce((acc, i) => acc + i.commissionEarned, 0);
  const totalPaid = ledger.filter(i => i.payoutStatus === 'Paid').reduce((acc, i) => acc + i.commissionEarned, 0);

  const generatedUrl = `https://store.kiaan.pa?ref=${customPartnerCode}&utm_source=affiliate&utm_campaign=${customCampaignTag}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(generatedUrl);
    addToast('Referral link with UTM tracking copied to clipboard', 'info');
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAllApproved = () => {
    const approvedIds = ledger.filter(i => i.payoutStatus === 'Approved').map(i => i.id);
    setSelectedIds(approvedIds);
  };

  const handleExecuteBatchPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingPayout(true);

    setTimeout(() => {
      setLedger(prev => prev.map(item => {
        if (selectedIds.includes(item.id)) {
          return {
            ...item,
            payoutStatus: 'Paid',
            payoutMethod: payoutRail === 'ACH_BG' ? 'ACH Banco General' : payoutRail === 'YAPPY' ? 'Yappy Comercial' : 'ACH Banistmo'
          };
        }
        return item;
      }));

      const payoutTotal = ledger
        .filter(i => selectedIds.includes(i.id))
        .reduce((sum, i) => sum + i.commissionEarned, 0);

      setProcessingPayout(false);
      setIsPayoutModalOpen(false);
      setSelectedIds([]);
      addToast(`Batch payout of $${payoutTotal.toFixed(2)} processed via ${payoutRail === 'ACH_BG' ? 'ACH Banco General Directo' : 'Yappy Comercial'}`, 'success');
    }, 1200);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Referrals & Affiliate Commission Ledger</h1>
            <p className="text-sm text-slate-500">
              Track multi-tier referral attribution, order conversions, click analytics, and batch ACH/Yappy commission settlements.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/partners'}>
              View Partner Directory
            </Button>
            <Button
              size="sm"
              disabled={selectedIds.length === 0}
              onClick={() => setIsPayoutModalOpen(true)}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Selected Commissions ({selectedIds.length})
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Referred Sales"
            value={`$${totalReferredGross.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subtitle="Gross order revenue"
            icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
          />
          <StatCard
            title="Total Commissions"
            value={`$${totalCommissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subtitle="All-time partner earnings"
            icon={<Share2 className="w-5 h-5 text-purple-600" />}
          />
          <StatCard
            title="Ready for Payout"
            value={`$${totalApprovedUnpaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subtitle="Approved pending settlement"
            icon={<Clock className="w-5 h-5 text-amber-600" />}
          />
          <StatCard
            title="Settled via ACH/Yappy"
            value={`$${totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subtitle="Completed dispatches"
            icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
          />
        </div>

        {/* Link Generator Box */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-indigo-400" />
                Partner Link & QR Generator
              </h2>
              <p className="text-xs text-slate-300">
                Generate trackable attribution links with 60-day cookie retention and fraud protection.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-indigo-800/80 text-indigo-200 px-2.5 py-1 rounded-full font-mono">
                Attribution: Last Click (60 Days)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Affiliate Code</label>
              <Input
                value={customPartnerCode}
                onChange={e => setCustomPartnerCode(e.target.value.toUpperCase())}
                className="bg-slate-800/90 border-slate-700 text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Campaign UTM Tag</label>
              <Input
                value={customCampaignTag}
                onChange={e => setCustomCampaignTag(e.target.value)}
                className="bg-slate-800/90 border-slate-700 text-white font-mono text-xs"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="secondary"
                className="w-full text-xs font-semibold h-10"
                onClick={handleCopyLink}
              >
                <Copy className="w-4 h-4 mr-2" /> Copy Full Referral URL
              </Button>
            </div>
          </div>

          <div className="p-2.5 bg-slate-950/60 rounded-lg text-xs font-mono text-indigo-300 break-all border border-slate-800">
            {generatedUrl}
          </div>
        </div>

        {/* Filter and Selection Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search order #, partner, or client..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              options={[
                { value: 'All', label: 'All Payout Statuses' },
                { value: 'Approved', label: 'Approved (Ready to Pay)' },
                { value: 'Pending Review', label: 'Pending Review' },
                { value: 'Paid', label: 'Paid & Settled' }
              ]}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleSelectAllApproved} className="text-xs">
              Select All Approved
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])} className="text-xs text-slate-500">
              Clear Selection
            </Button>
          </div>
        </div>

        {/* Commission Ledger Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-10">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="py-3 px-4">Order & Date</th>
                  <th className="py-3 px-4">Partner & Code</th>
                  <th className="py-3 px-4">Customer Referred</th>
                  <th className="py-3 px-4">Gross Sale</th>
                  <th className="py-3 px-4">Commission %</th>
                  <th className="py-3 px-4">Earned</th>
                  <th className="py-3 px-4">Payout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map(item => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isChecked ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(item.id)}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 font-mono text-xs">{item.orderNumber}</div>
                        <div className="text-[11px] text-slate-400">{item.saleDate}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{item.partnerName}</div>
                        <div className="text-[10px] font-mono text-indigo-600 font-bold">{item.partnerCode}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-700">
                        {item.customerName}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-800 text-xs">
                        ${item.orderAmount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {item.commissionRate}%
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 text-xs">
                        ${item.commissionEarned.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          {item.payoutStatus === 'Approved' && <Badge variant="warning">Approved</Badge>}
                          {item.payoutStatus === 'Paid' && <Badge variant="success">Paid</Badge>}
                          {item.payoutStatus === 'Pending Review' && <Badge variant="secondary">Pending Review</Badge>}
                          {item.payoutMethod && (
                            <div className="text-[10px] text-slate-400 font-mono">{item.payoutMethod}</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Batch Payout Settlement Modal */}
        <Modal
          isOpen={isPayoutModalOpen}
          onClose={() => setIsPayoutModalOpen(false)}
          title="Disburse Batch Commission Payout"
        >
          <form onSubmit={handleExecuteBatchPayout} className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-xs font-semibold text-slate-700">Batch Summary:</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Selected Ledger Entries:</span>
                <span className="font-bold text-slate-900">{selectedIds.length} items</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Total Disbursement Amount:</span>
                <span className="font-bold text-emerald-600 text-base font-mono">
                  ${ledger
                    .filter(i => selectedIds.includes(i.id))
                    .reduce((sum, i) => sum + i.commissionEarned, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Disbursement Banking Rail
              </label>
              <Select
                value={payoutRail}
                onChange={e => setPayoutRail(e.target.value)}
                options={[
                  { value: 'ACH_BG', label: 'ACH Directo (Banco General Panama)' },
                  { value: 'YAPPY', label: 'Yappy Comercial Payout API' },
                  { value: 'ACH_BANISTMO', label: 'ACH Directo (Banistmo / Bancolombia)' },
                  { value: 'WIRE', label: 'International SWIFT Wire Transfer' }
                ]}
              />
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-800 space-y-1">
              <div className="font-semibold">Fiscal Retention Note (Panama DGI):</div>
              <p className="text-[11px] text-indigo-700">
                Commissions paid to independent natural persons without valid billing RUC are subject to withholding tax per Art. 1001-A of the Panama Fiscal Code.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsPayoutModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={processingPayout}>
                {processingPayout ? 'Transmitting ACH Rails...' : 'Confirm & Disburse Batch'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
