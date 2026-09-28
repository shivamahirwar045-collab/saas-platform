'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useSaaS } from '../../context/SaaSContext';
import { PartnerAffiliate } from '../../types/saas';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import {
  Share2,
  Users,
  CreditCard,
  Plus,
  Search,
  Check,
  X,
  Link2,
  ArrowRight
} from '../../components/icons';
import { mockPartners } from '../../data/mockData';

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerAffiliate[]>(mockPartners);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);

  const [partnerForm, setPartnerForm] = useState({
    name: '',
    type: 'Influencer' as const,
    referralCode: '',
    commissionRate: 10
  });

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name) return;

    const newPartner: PartnerAffiliate = {
      id: `part_${Date.now()}`,
      name: partnerForm.name,
      type: partnerForm.type,
      referralCode: (partnerForm.referralCode || partnerForm.name.toUpperCase().replace(/\s+/g, '')).slice(0, 12),
      clicks: 0,
      signups: 0,
      payingCustomers: 0,
      grossRevenue: 0,
      commissionRate: Number(partnerForm.commissionRate),
      earnedCommission: 0,
      paidCommission: 0,
      status: 'Active'
    };

    setPartners([...partners, newPartner]);
    setIsAddPartnerOpen(false);
  };

  const partnerColumns: Column<PartnerAffiliate>[] = [
    {
      header: 'Partner / Influencer',
      cell: (p) => (
        <div>
          <span className="font-bold text-slate-900">{p.name}</span>
          <p className="text-[10px] text-blue-600 font-mono font-bold">Code: {p.referralCode}</p>
        </div>
      )
    },
    {
      header: 'Partner Tier',
      accessorKey: 'type'
    },
    {
      header: 'Link Clicks',
      cell: (p) => <span>{p.clicks.toLocaleString()}</span>
    },
    {
      header: 'Paying Conversions',
      cell: (p) => (
        <div>
          <span className="font-bold text-slate-900">{p.payingCustomers} sales</span>
          <p className="text-[10px] text-slate-400">{p.signups} signups</p>
        </div>
      )
    },
    {
      header: 'Gross Revenue',
      cell: (p) => <span className="font-extrabold text-slate-900">${p.grossRevenue.toLocaleString()}</span>
    },
    {
      header: 'Commission Earned',
      cell: (p) => (
        <div>
          <span className="font-bold text-emerald-600">${p.earnedCommission.toLocaleString()}</span>
          <p className="text-[10px] text-slate-400">Rate: {p.commissionRate}%</p>
        </div>
      )
    },
    {
      header: 'Status',
      cell: (p) => (
        <Badge variant={p.status === 'Active' ? 'success' : 'default'}>
          {p.status}
        </Badge>
      )
    },
    {
      header: 'Payout Action',
      cell: (p) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Simulated ACH commission disbursement scheduled for ${p.name}: $${(p.earnedCommission - p.paidCommission).toFixed(2)}`);
          }}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
        >
          Pay Balance
        </button>
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
              Affiliates, Influencers &amp; Partner Network
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Referral link attribution, UTM conversion tracking, commission calculations, and partner disbursements.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddPartnerOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Partner</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Partner Sourced Revenue"
            value="$153,100"
            change="28.4%"
            isPositive={true}
            subtitle="Attributed purchases"
            icon={<CreditCard className="w-5 h-5" />}
          />
          <StatCard
            title="Total Commissions Earned"
            value="$16,016"
            subtitle="Accrued across all affiliates"
            icon={<Share2 className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Total Referral Clicks"
            value="18,450"
            subtitle="Social &amp; tech review links"
            icon={<Link2 className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Active Brand Advocates"
            value={partners.length}
            subtitle="3 Active Influencers"
            icon={<Users className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Partners Table */}
        <DataTable
          data={partners}
          columns={partnerColumns}
          searchPlaceholder="Search partners by name or code..."
          title="Affiliate &amp; Influencer Ledger"
          subtitle="Real-time multi-touch attribution and commission rules"
        />

        {/* ENROLL MODAL */}
        {isAddPartnerOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Enroll New Partner or Influencer</h3>
                <button onClick={() => setIsAddPartnerOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePartner} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Partner / Creator Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Panama Tech Insider"
                    value={partnerForm.name}
                    onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Partner Type</label>
                    <select
                      value={partnerForm.type}
                      onChange={e => setPartnerForm({ ...partnerForm, type: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    >
                      <option value="Influencer">Influencer</option>
                      <option value="Affiliate">Affiliate Site</option>
                      <option value="Agency Partner">Agency Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Commission Rate (%)</label>
                    <input
                      type="number"
                      value={partnerForm.commissionRate}
                      onChange={e => setPartnerForm({ ...partnerForm, commissionRate: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Custom Promo Code</label>
                  <input
                    type="text"
                    placeholder="e.g. PANAMATECH"
                    value={partnerForm.referralCode}
                    onChange={e => setPartnerForm({ ...partnerForm, referralCode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none font-mono uppercase"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddPartnerOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-semibold shadow-xs"
                  >
                    Create Affiliate Link
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
