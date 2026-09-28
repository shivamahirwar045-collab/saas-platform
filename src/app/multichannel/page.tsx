'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useSaaS } from '../../context/SaaSContext';
import { SalesChannelMetric } from '../../types/saas';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import {
  Globe,
  ShoppingCart,
  Monitor,
  Phone,
  CreditCard,
  Share2,
  Zap,
  RefreshCw,
  CheckCircle,
  Clock,
  ArrowRight
} from '../../components/icons';
import { mockSalesChannels } from '../../data/mockData';

export default function MultichannelPage() {
  const { currentBusiness } = useSaaS();

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'Website': return <Globe className="w-5 h-5" />;
      case 'Ecommerce': return <ShoppingCart className="w-5 h-5" />;
      case 'POS': return <Monitor className="w-5 h-5" />;
      case 'WhatsApp': return <Phone className="w-5 h-5" />;
      case 'Payment Links': return <CreditCard className="w-5 h-5" />;
      case 'Mobile App': return <span className="text-base">📱</span>;
      default: return <Share2 className="w-5 h-5" />;
    }
  };

  const totalOmniSales = mockSalesChannels.reduce((sum, ch) => sum + ch.monthlySales, 0);
  const totalOmniOrders = mockSalesChannels.reduce((sum, ch) => sum + ch.orderCount, 0);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Multichannel Sales Matrix
              </h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                Single Core Database
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              One centralized operating database powering web, brick-and-mortar POS, WhatsApp broadcasts, and mobile checkout.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Real-time sync verified across all 6 connected sale endpoints.')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Force Sync Channels</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Omnichannel Sales"
            value={`$${totalOmniSales.toLocaleString()}`}
            change="18.4%"
            isPositive={true}
            subtitle="Combined across 6 channels"
            icon={<CreditCard className="w-5 h-5" />}
          />
          <StatCard
            title="Total Combined Orders"
            value={`${totalOmniOrders} Orders`}
            subtitle="Unified customer ledger"
            icon={<ShoppingCart className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Active Endpoints"
            value="6 of 7 Connected"
            isPositive={true}
            subtitle="Real-time webhooks"
            icon={<Zap className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Data Redundancy"
            value="Zero Duplication"
            subtitle="Shared customer &amp; SKU core"
            icon={<CheckCircle className="w-5 h-5" />}
            iconBg="bg-teal-50 text-teal-600"
          />
        </div>

        {/* Channels Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockSalesChannels.map(ch => (
            <div
              key={ch.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {getChannelIcon(ch.channel)}
                  </div>
                  <Badge variant={ch.status === 'Connected' ? 'success' : 'info'}>
                    {ch.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{ch.channel}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{ch.lastSync}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Monthly Sales:</span>
                    <span className="font-extrabold text-slate-900">${ch.monthlySales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orders Processed:</span>
                    <span className="font-semibold text-slate-800">{ch.orderCount} orders</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audience Reach:</span>
                    <span className="font-semibold text-slate-800">{ch.customerReach.toLocaleString()} users</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-600 font-bold">✓ Centralized CRM Synced</span>
                <button
                  onClick={() => alert(`Configuring parameters for channel ${ch.channel}`)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Configure →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Guarantee Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" /> Architectural Guarantee from Master Requirements
          </div>
          <h3 className="text-base font-bold">One Central Operating System, Never Disconnected Silos</h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            When a customer buys on your website, scans a barcode at the physical Multiplaza cash register, or completes an order via WhatsApp payment link, their purchase history, loyalty points, and inventory deduct from the exact same central database, and their electronic invoice is authorized through Panama DGI PAC automatically.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
