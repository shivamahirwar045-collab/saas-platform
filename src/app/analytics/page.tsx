'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useSaaS } from '../../context/SaaSContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  Calendar,
  Building2,
  Package,
  Users,
  CreditCard,
  Sparkles,
  ArrowRight
} from '../../components/icons';
import { mockBranches, mockProducts } from '../../data/mockData';

export default function AnalyticsPage() {
  const { currentBusiness, branches } = useSaaS();
  const [selectedRange, setSelectedRange] = useState<'30d' | '90d' | 'ytd'>('30d');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('all');

  const branchSalesData = [
    { name: 'Colon Free Zone Hub', amount: 132000, percent: 39 },
    { name: 'Calle 50 Flagship', amount: 94500, percent: 28 },
    { name: 'Multiplaza Mall Branch', amount: 68200, percent: 20 },
    { name: 'David Chiriqui Express', amount: 41800, percent: 13 }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Business Intelligence &amp; Analytics (BI)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Cross-branch consolidated executive reports, product velocity, and AI forecasting.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter by Branch */}
            <select
              value={selectedBranchFilter}
              onChange={e => setSelectedBranchFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-700"
            >
              <option value="all">All 4 Branches Consolidated</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name.split(' (')[0]}</option>
              ))}
            </select>

            {/* Time range */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-medium text-slate-600">
              <button
                onClick={() => setSelectedRange('30d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedRange === '30d' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                }`}
              >
                30D
              </button>
              <button
                onClick={() => setSelectedRange('90d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedRange === '90d' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                }`}
              >
                Q3
              </button>
              <button
                onClick={() => setSelectedRange('ytd')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedRange === 'ytd' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
                }`}
              >
                YTD
              </button>
            </div>

            <button
              onClick={() => alert('Generating complete BI PDF report with financial and tax breakdown...')}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export BI Report</span>
            </button>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="font-bold">AI Diagnostic Summary:</p>
              <p className="text-slate-700 leading-relaxed mt-0.5">
                Gross margin is highest in Wearables &amp; Audio (44.2%), while Colon Free Zone provides 39% of total turnover through B2B wholesale. Customer repurchase rate improved by +8.4% since WhatsApp automated order tracking was deployed.
              </p>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Consolidated Gross Sales"
            value="$340,350"
            change="18.4%"
            isPositive={true}
            subtitle="Trailing 30-day period"
            icon={<CreditCard className="w-5 h-5" />}
          />
          <StatCard
            title="Net Profit Margin"
            value="31.8%"
            change="2.1%"
            isPositive={true}
            subtitle="After COGS and freight"
            icon={<TrendingUp className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Customer Retention Rate"
            value="68.4%"
            change="5.2%"
            isPositive={true}
            subtitle="Repeat B2B &amp; retail buyers"
            icon={<Users className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Inventory Turnover"
            value="4.6x"
            subtitle="Annualized velocity"
            icon={<Package className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branch Revenue Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Branch Performance Comparison</h3>
              <span className="text-xs text-slate-500">4 Active Locations</span>
            </div>

            <div className="space-y-4">
              {branchSalesData.map(b => (
                <div key={b.name} className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800">{b.name}</span>
                    <span className="font-bold text-slate-900">${b.amount.toLocaleString()} ({b.percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${b.percent}%` }}
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              * Includes physical POS terminal receipts, warehouse dispatches, and branch click-and-collect orders.
            </div>
          </div>

          {/* Top Products Velocity */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Top Velocity Products (30 Days)</h3>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                High Margin
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {mockProducts.slice(0, 4).map(prod => (
                <div key={prod.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prod.images[0]} alt={prod.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                    <div>
                      <p className="font-bold text-slate-900">{prod.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">SKU: {prod.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">${prod.price.toFixed(2)}</span>
                    <p className="text-[10px] text-emerald-600 font-semibold">{prod.stock} units in stock</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                Export SKU Velocity CSV →
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
