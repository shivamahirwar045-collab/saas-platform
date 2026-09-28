'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import {
  CreditCard,
  ShoppingCart,
  Users,
  Package,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Receipt,
  Store,
  CheckCircle,
  Clock,
  ChevronRight,
  Zap,
  Globe,
  Monitor
} from '@/components/icons';
import Link from 'next/link';

export default function DashboardPage() {
  const { currentBusiness, currentBranch, orders, products, leads, fiscalInvoices, setIsCopilotOpen } = useSaaS();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Low stock products
  const lowStockProducts = products.filter(p => p.stock <= p.minStockAlert);
  const pendingPacInvoices = fiscalInvoices.filter(f => f.pacStatus !== 'Authorized');

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Title & Context Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Business Operating Overview
              </h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                {currentBranch.name.split(' (')[0]}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time enterprise metrics across digital channels, POS registers, warehouse stock, and fiscal PAC.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-medium text-slate-600">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === '7d' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === '30d' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange('90d')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === '90d' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Quarter
              </button>
            </div>

            <button
              onClick={() => setIsCopilotOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Insights</span>
            </button>
          </div>
        </div>

        {/* AI Business Summary Card */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white shadow-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-semibold text-blue-300 uppercase tracking-wider bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5" /> AI Executive Intelligence
                </span>
                <span className="text-[11px] text-slate-300">Generated 8 mins ago</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Monthly revenue reached $340,350 (+18.4% vs previous cycle)
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Omnichannel sales are thriving with Multiplaza Pacific branch recording high ticket wearable conversion. 2 items are below safety thresholds in logistics, and 1 high-value corporate lead ($65,000 with Banco Continental) is awaiting contract authorization.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
              <button
                onClick={() => setIsCopilotOpen(true)}
                className="px-4 py-2 bg-white text-blue-900 hover:bg-blue-50 rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                Ask Copilot Details
              </button>
              <Link
                href="/inventory"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-medium text-white transition-colors"
              >
                Review Low Stock (2)
              </Link>
            </div>
          </div>
        </div>

        {/* 8 Primary Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <StatCard
            title="Total Gross Sales"
            value="$340,350"
            change="18.4%"
            isPositive={true}
            subtitle="Combined POS + Web + Links"
            icon={<CreditCard className="w-5 h-5" />}
            iconBg="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Orders Processed"
            value="1,248"
            change="12.2%"
            isPositive={true}
            subtitle="99.4% fulfillment rate"
            icon={<ShoppingCart className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Active Customers"
            value="2,410"
            change="8.6%"
            isPositive={true}
            subtitle="148 VIP loyalty accounts"
            icon={<Users className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Active Leads Value"
            value="$139,500"
            change="24.0%"
            isPositive={true}
            subtitle="5 enterprise deals in pipeline"
            icon={<Zap className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
          <StatCard
            title="Catalog Products"
            value="128 SKUs"
            subtitle="Across 8 categories"
            icon={<Package className="w-5 h-5" />}
            iconBg="bg-indigo-50 text-indigo-600"
          />
          <StatCard
            title="Panama PAC Invoices"
            value="49,281"
            change="100%"
            isPositive={true}
            subtitle="Authorized DGI electronic"
            icon={<Receipt className="w-5 h-5" />}
            iconBg="bg-teal-50 text-teal-600"
          />
          <StatCard
            title="Low Stock Alerts"
            value={`${lowStockProducts.length} Items`}
            change="Action Needed"
            isPositive={false}
            subtitle="PO-2026-0341 in transit"
            icon={<AlertTriangle className="w-5 h-5" />}
            iconBg="bg-rose-50 text-rose-600"
          />
          <StatCard
            title="Pending Collections"
            value="$4,120.00"
            subtitle="1 payment link pending"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-orange-50 text-orange-600"
          />
        </div>

        {/* Charts & Channel Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Sales Trend SVG Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Revenue & Omnichannel Performance</h3>
                <p className="text-xs text-slate-500 mt-0.5">Monthly gross revenue vs target trajectory</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Actual Sales
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Target ($300k)
                </span>
              </div>
            </div>

            {/* Custom Responsive SVG Chart */}
            <div className="py-6">
              <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 px-2">
                {[
                  { month: 'Apr', val: 210, target: 200 },
                  { month: 'May', val: 245, target: 220 },
                  { month: 'Jun', val: 230, target: 240 },
                  { month: 'Jul', val: 280, target: 260 },
                  { month: 'Aug', val: 295, target: 280 },
                  { month: 'Sep', val: 340, target: 300, current: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${item.val}k
                    </span>
                    <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg relative h-full flex items-end overflow-hidden">
                      <div
                        style={{ height: `${(item.val / 380) * 100}%` }}
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          item.current
                            ? 'bg-gradient-to-t from-blue-700 to-indigo-500 shadow-md'
                            : 'bg-blue-600/80 group-hover:bg-blue-600'
                        }`}
                      ></div>
                      {/* Target line mark */}
                      <div
                        style={{ bottom: `${(item.target / 380) * 100}%` }}
                        className="absolute left-0 right-0 border-t-2 border-dashed border-slate-400/80 pointer-events-none"
                      ></div>
                    </div>
                    <span className={`text-xs ${item.current ? 'font-bold text-blue-600' : 'text-slate-500'}`}>
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Leading channel: <strong className="text-slate-800">Physical POS (42%)</strong></span>
              <Link href="/analytics" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                View Full BI Reports <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Sales Channels Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Multichannel Distribution</h3>
                <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  All Active
                </span>
              </div>

              <div className="mt-4 space-y-3.5">
                {[
                  { name: 'In-Store POS', amount: '$142,800', share: 42, color: 'bg-blue-600' },
                  { name: 'Ecommerce Website', amount: '$98,450', share: 29, color: 'bg-indigo-600' },
                  { name: 'Payment Links & B2B', amount: '$45,600', share: 13, color: 'bg-purple-600' },
                  { name: 'WhatsApp Sales', amount: '$38,200', share: 11, color: 'bg-emerald-600' },
                  { name: 'Mobile App / Other', amount: '$15,300', share: 5, color: 'bg-amber-600' }
                ].map((ch, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">{ch.name}</span>
                      <span className="font-bold text-slate-900">{ch.amount} ({ch.share}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${ch.share}%` }}
                        className={`h-full ${ch.color} rounded-full`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
              <span>All 6 channels synced to unified customer history</span>
              <Link href="/multichannel" className="text-blue-600 font-semibold hover:underline">
                Manage
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Orders & Urgent Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Omnichannel Orders</h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time transactions linked to Panama PAC fiscal status</p>
              </div>
              <Link
                href="/ecommerce"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View All Orders <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3">Order</th>
                    <th className="py-3">Customer</th>
                    <th className="py-3">Channel</th>
                    <th className="py-3">Amount</th>
                    <th className="py-3">Fulfillment</th>
                    <th className="py-3">PAC Fiscal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 font-bold text-slate-900">
                        {o.orderNumber}
                      </td>
                      <td className="py-3.5">
                        <p className="font-semibold text-slate-800">{o.customerName}</p>
                        <p className="text-[10px] text-slate-400">{o.customerEmail}</p>
                      </td>
                      <td className="py-3.5">
                        <span className="font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                          {o.channel}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-slate-900">
                        ${o.total.toFixed(2)}
                      </td>
                      <td className="py-3.5">
                        <Badge
                          variant={
                            o.status === 'Delivered'
                              ? 'success'
                              : o.status === 'Out for Delivery'
                              ? 'info'
                              : o.status === 'Prepared'
                              ? 'purple'
                              : 'warning'
                          }
                        >
                          {o.status}
                        </Badge>
                      </td>
                      <td className="py-3.5">
                        <Badge
                          variant={
                            o.fiscalStatus === 'Authorized'
                              ? 'success'
                              : o.fiscalStatus === 'Pending'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {o.fiscalStatus === 'Authorized' ? '✓ CUFE Authorized' : o.fiscalStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Operational Alerts & Branch Quick Status */}
          <div className="space-y-6">
            {/* Urgent Operational Alerts */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Operational Attention Items
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs">
                  <div className="flex items-center justify-between font-bold text-rose-800">
                    <span>Low Inventory Warning</span>
                    <span className="text-[10px] bg-rose-200/70 px-1.5 py-0.5 rounded">2 SKUs</span>
                  </div>
                  <p className="text-rose-700 mt-1 leading-relaxed">
                    OmniSmart Watch Series 5 (3 left) and VisionPro Display (2 left) reached minimum safety buffer.
                  </p>
                  <Link
                    href="/inventory"
                    className="inline-block mt-2 font-semibold text-rose-800 hover:underline text-[11px]"
                  >
                    Generate Purchase Order →
                  </Link>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
                  <div className="flex items-center justify-between font-bold text-blue-900">
                    <span>Enterprise Lead Action</span>
                    <span className="text-[10px] bg-blue-200/70 px-1.5 py-0.5 rounded">$65k Value</span>
                  </div>
                  <p className="text-blue-800 mt-1 leading-relaxed">
                    Banco Continental Panama negotiation meeting scheduled for today 2:30 PM with Alexander Sterling.
                  </p>
                  <Link
                    href="/crm"
                    className="inline-block mt-2 font-semibold text-blue-900 hover:underline text-[11px]"
                  >
                    View Lead Dossier →
                  </Link>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span>Panama PAC Engine Status</span>
                    <span className="text-[10px] text-emerald-700 font-mono font-semibold">100% PASS</span>
                  </div>
                  <p className="text-emerald-800 mt-1 leading-relaxed">
                    DGI authorized service provider The Factory HKA responded with 142ms latency. All fiscal queues clear.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-xs">
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">
                Rapid Access Workflows
              </h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Launch retail checkout on tablets, launch AI website generation, or inspect driver dispatch.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/pos"
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-center text-xs font-semibold transition-colors flex flex-col items-center gap-1"
                >
                  <Monitor className="w-4 h-4 text-blue-300" />
                  <span>Launch POS</span>
                </Link>
                <Link
                  href="/website"
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-center text-xs font-semibold transition-colors flex flex-col items-center gap-1"
                >
                  <Globe className="w-4 h-4 text-emerald-300" />
                  <span>Site Builder</span>
                </Link>
                <Link
                  href="/delivery"
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-center text-xs font-semibold transition-colors flex flex-col items-center gap-1"
                >
                  <span className="text-sm">🚚</span>
                  <span>Deliveries</span>
                </Link>
                <Link
                  href="/attendance"
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-center text-xs font-semibold transition-colors flex flex-col items-center gap-1"
                >
                  <span className="text-sm">⏱️</span>
                  <span>Dynamic QR</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
