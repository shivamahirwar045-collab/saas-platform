'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Globe,
  ShoppingCart,
  Users,
  Monitor,
  CreditCard,
  Receipt,
  Package,
  Truck,
  UserCheck,
  Megaphone,
  BarChart3,
  Shield,
  Layers,
  Zap,
  Menu,
  X,
  ChevronDown,
  Star,
  Play,
  Check,
  Building2,
  Clock
} from '@/components/icons';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'pos' | 'website' | 'crm' | 'inventory' | 'fiscal'>('pos');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ROI Calculator state
  const [roiOrders, setRoiOrders] = useState(850);
  const [roiAov, setRoiAov] = useState(65);
  const [roiEmployees, setRoiEmployees] = useState(12);
  const [roiBranches, setRoiBranches] = useState(2);

  // Calculated ROI
  const monthlyRevenue = roiOrders * roiAov;
  const separateSaaSMonthlyCost = 99 + 149 + 189 + 120 + 75 + (roiEmployees * 15);
  const businessOsCost = roiBranches > 1 ? 149 : 49;
  const monthlySavings = separateSaaSMonthlyCost - businessOsCost;
  const annualSavings = monthlySavings * 12;
  const estimatedHoursSaved = Math.round(roiEmployees * 14);

  const showcaseContent = {
    pos: {
      title: 'Cloud Point of Sale & Cash Registers',
      subtitle: 'Lightning-fast touch terminal synchronized with web inventory and fiscal PAC',
      points: [
        'Instant barcode scanning and multi-tender checkout (Cash, Card, Yappy, Crypto)',
        'Automatic DGI-compliant fiscal factura generation with CUFE and QR',
        'Multi-register shift tracking with opening/closing float reconciliation',
        'Works seamlessly on iPad, Android tablets, laptops, and POS terminals'
      ],
      tag: 'Retail & Food Tech',
      metric: '0.8s',
      metricLabel: 'Average Checkout Time'
    },
    website: {
      title: 'AI-Powered Digital Storefront Builder',
      subtitle: 'Turn your product catalog into a high-converting website in under 60 seconds',
      points: [
        'Generate full landing pages, catalogs, and checkout with one prompt',
        'Real-time WYSIWYG section builder with custom styling and device preview',
        'Automated SEO meta tags, OpenGraph previews, and sitemap generation',
        'Custom domain binding with free automated SSL encryption'
      ],
      tag: 'No-Code E-commerce',
      metric: '60s',
      metricLabel: 'From Prompt to Live Store'
    },
    crm: {
      title: 'Customer 360 & Deal Pipelines',
      subtitle: 'Turn website visitors and retail shoppers into lifetime brand advocates',
      points: [
        'Omnichannel Customer 360 profile unifying store visits, orders, and chats',
        '7-stage Kanban deal pipeline with probability forecasting',
        'Automatic segmentation: VIP, Corporate, Repeat, and At-Risk',
        'WhatsApp direct messaging and automated follow-up sequences'
      ],
      tag: 'Sales Automation',
      metric: '3.4x',
      metricLabel: 'Higher Lead Conversion'
    },
    inventory: {
      title: 'Multi-Warehouse & Smart Stock Buffer',
      subtitle: 'Never lose a sale to out-of-stock items across branches or online stores',
      points: [
        'Real-time inventory sync across online stores, retail branches, and warehouses',
        'Automated low-stock buffer alerts and dynamic supplier purchase orders',
        'Aisle, rack, and shelf bin mapping with barcode location tracking',
        'Inter-branch stock transfer requests with digital audit trails'
      ],
      tag: 'Supply Chain',
      metric: '99.8%',
      metricLabel: 'Inventory Accuracy'
    },
    fiscal: {
      title: 'Panama DGI PAC Certified Invoicing',
      subtitle: '100% tax compliant electronic invoicing built directly into every sale',
      points: [
        'Official PAC authorization with The Factory HKA and Digifact integration',
        'Automated CUFE generation, RUC/DV validation, and tamper-proof QR codes',
        'Automatic transmission queue with offline buffering and retry resilience',
        'Direct PDF email delivery and 80mm thermal receipt printing'
      ],
      tag: 'Legal Compliance',
      metric: '100%',
      metricLabel: 'DGI Compliance Guarantee'
    }
  };

  const coreModules = [
    {
      icon: Monitor,
      name: 'Cloud Point of Sale',
      desc: 'Cashier-friendly register mode, multi-tender split, barcode scanning, and shift drawer control.',
      path: '/pos'
    },
    {
      icon: ShoppingCart,
      name: 'Ecommerce & Orders',
      desc: 'Centralized product catalog, variant matrix, order dispatch, and customer accounts.',
      path: '/ecommerce'
    },
    {
      icon: Globe,
      name: 'AI Website Builder',
      desc: 'Generate, edit, and publish modern responsive storefronts with no coding required.',
      path: '/website'
    },
    {
      icon: Users,
      name: 'CRM & Lead Pipeline',
      desc: 'Visual Kanban pipeline, deal valuations, customer dossiers, and omnichannel chat history.',
      path: '/crm'
    },
    {
      icon: CreditCard,
      name: 'Payments & Yappy Links',
      desc: 'Instant checkout links for WhatsApp, card processing, recurring billing, and payout reconciliation.',
      path: '/payments'
    },
    {
      icon: Receipt,
      name: 'Fiscal Billing (PAC)',
      desc: 'Native Panama electronic invoicing with CUFE, PAC handshakes, and verifiable QR codes.',
      path: '/fiscal'
    },
    {
      icon: Package,
      name: 'Smart Inventory',
      desc: 'Multi-warehouse stock reserves, low-stock alerts, bin locations, and stock movements.',
      path: '/inventory'
    },
    {
      icon: Truck,
      name: 'Delivery & Logistics',
      desc: 'Live dispatch board, route optimization, driver assignments, and digital proof-of-delivery.',
      path: '/delivery'
    },
    {
      icon: UserCheck,
      name: 'HR & Directory',
      desc: 'Employee personnel files, shifts, digital contracts, and departmental organization.',
      path: '/hr'
    },
    {
      icon: Clock,
      name: 'Attendance & Dynamic QR',
      desc: 'Tablet kiosk with anti-fraud rolling QR codes and GPS geofence shift check-ins.',
      path: '/attendance'
    },
    {
      icon: Megaphone,
      name: 'Marketing & Loyalty',
      desc: 'WhatsApp campaigns, loyalty points program, and AI-written promotion copy.',
      path: '/marketing'
    },
    {
      icon: BarChart3,
      name: 'BI Analytics & Reports',
      desc: 'Real-time profit margins, branch comparison matrices, inventory velocity, and CSV exports.',
      path: '/analytics'
    }
  ];

  const faqs = [
    {
      q: 'Can KIAAN replace Shopify, HubSpot, Toast, and QuickBooks all together?',
      a: 'Yes! That is the core architecture of KIAAN BusinessOS. Instead of paying for 6 to 8 disparate subscriptions, managing fragile Zapier integrations, and reconciling messy data, KIAAN connects your website, POS registers, CRM, inventory, and accounting into one single operating system.'
    },
    {
      q: 'Does it support Panama Electronic Invoicing (Factura Electrónica / PAC)?',
      a: 'Absolutely. KIAAN is natively built for Panama DGI regulations with PAC certified integrations (including The Factory HKA and Digifact). It automatically issues CUFE identifiers, validates RUC and DV, generates compliant QR codes, and submits records in real-time.'
    },
    {
      q: 'Can I manage multiple retail branches and warehouses?',
      a: 'Yes. You can manage unlimited branches, retail stores, and warehouse fulfillment centers. Switch between branches with one click, run separate cash registers per store, and transfer stock between locations seamlessly.'
    },
    {
      q: 'How does the AI Assistant help day-to-day operations?',
      a: 'KIAAN includes embedded AI Copilots that generate marketing copy, draft WhatsApp promotional campaigns, write SEO descriptions for your products, forecast inventory depletion, and analyze business margins in plain language.'
    },
    {
      q: 'Is my business data secure and can I export it at any time?',
      a: 'Yes. Your data belongs entirely to you. You can export complete CSV and JSON archives of your customers, transactions, inventory, and fiscal logs at any time from the Settings center. All sessions are encrypted with enterprise-grade MFA support.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <span className="font-extrabold text-base tracking-tight">OS</span>
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                KIAAN <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-semibold">BusinessOS</span>
              </span>
              <p className="text-[10px] text-slate-400">All-in-One Operating System</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#modules" className="hover:text-white transition-colors">Modules</a>
            <a href="#ai" className="hover:text-white transition-colors">AI Engine</a>
            <a href="#roi" className="hover:text-white transition-colors">ROI Calculator</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Live Demo
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/30 hover:shadow-blue-600/50"
            >
              Start 7-Day Free Trial
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
              <a href="#platform" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Platform</a>
              <a href="#modules" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Modules</a>
              <a href="#ai" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">AI Engine</a>
              <a href="#roi" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">ROI Calculator</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">FAQ</a>
            </nav>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <Link
                href="/login"
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-blue-400 border border-blue-500/30 bg-blue-500/10"
              >
                Explore Live Demo
              </Link>
              <Link
                href="/signup"
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Release tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-8 animate-in fade-in duration-500 shadow-lg shadow-blue-900/30">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Next-Generation Enterprise Release v2.4</span>
            <span className="text-slate-500">|</span>
            <span className="text-blue-200 font-normal">Panama PAC DGI Certified</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.12]">
            One Business. One Platform. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              Everything Connected.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Eliminate 8+ disjointed software subscriptions. KIAAN unites your storefront website,
            cloud POS, omnichannel CRM, multi-warehouse stock, staff attendance, and Panama fiscal billing
            into a single, AI-powered operating system.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center justify-center gap-3 transition-all group"
            >
              <span>Start 7-Day Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-base flex items-center justify-center gap-3 transition-all"
            >
              <Play className="w-4 h-4 text-blue-400" />
              <span>Explore Interactive Dashboard</span>
            </Link>
          </div>

          {/* Trust bullets */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Instant 2-minute setup
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> DGI Panama certified PAC
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Unlimited branch locations
            </span>
          </div>

          {/* Mockup Preview with Floating Cards */}
          <div className="mt-16 relative mx-auto max-w-5xl rounded-3xl p-3 bg-gradient-to-b from-slate-700/50 via-slate-800/40 to-slate-900 border border-slate-700/70 shadow-2xl shadow-blue-950/50">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative">
              {/* Fake Browser Top Bar */}
              <div className="h-10 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-4 py-1 rounded-md bg-slate-950 text-slate-400 text-[11px] font-mono border border-slate-800 flex items-center gap-2">
                  <span className="text-emerald-400">https://</span>
                  <span>app.kiaan.os/dashboard</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Multi-Branch Live</div>
              </div>

              {/* Dashboard Snapshot Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                {/* Metric 1 */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400">Gross Sales Today</p>
                  <p className="text-2xl font-bold text-white mt-1">$4,852.40</p>
                  <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    ↑ +18.4% vs yesterday
                  </p>
                </div>
                {/* Metric 2 */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400">Active POS Registers</p>
                  <p className="text-2xl font-bold text-white mt-1">4 Online</p>
                  <p className="text-[11px] text-blue-400 mt-1">Across 2 Branches</p>
                </div>
                {/* Metric 3 */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400">Panama PAC Invoices</p>
                  <p className="text-2xl font-bold text-white mt-1">100% PASS</p>
                  <p className="text-[11px] text-emerald-400 mt-1">CUFE auto-signed</p>
                </div>
                {/* Metric 4 */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400">Stock Buffer Health</p>
                  <p className="text-2xl font-bold text-white mt-1">98.2%</p>
                  <p className="text-[11px] text-amber-400 mt-1">2 POs pending supplier</p>
                </div>

                {/* Main Graph Area */}
                <div className="md:col-span-3 bg-slate-900/70 p-5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Omnichannel Sales Velocity (Web vs POS vs WhatsApp)
                    </span>
                    <span className="text-xs text-blue-400 font-mono">$142,850 MTD</span>
                  </div>
                  <div className="h-32 flex items-end gap-2 pt-4">
                    {[45, 62, 58, 75, 82, 70, 95, 88, 110, 102, 125, 140].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t transition-all group-hover:brightness-125"
                          style={{ height: `${(v / 140) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Copilot Feed */}
                <div className="bg-gradient-to-br from-blue-950/60 to-indigo-950/60 p-4 rounded-xl border border-blue-500/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                      <Sparkles className="w-3.5 h-3.5" /> AI Copilot Insights
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Stock for VisionPro Smart Band will deplete in 4 days at current run-rate. Auto-drafted PO #1049 for supplier approval.
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="mt-3 text-center py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
                  >
                    View in Dashboard →
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Live Badge 1 */}
            <div className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-3 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Factura Electrónica PAC</p>
                <p className="text-[11px] text-slate-400">CUFE validated in 140ms</p>
              </div>
            </div>

            {/* Floating Live Badge 2 */}
            <div className="absolute -top-6 -right-6 hidden lg:flex items-center gap-3 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Omnichannel Sync</p>
                <p className="text-[11px] text-slate-400">6 Sales Channels Live</p>
              </div>
            </div>
          </div>

          {/* Social Proof Brand Row */}
          <div className="mt-24 pt-12 border-t border-slate-800/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Powering modern retail, dining, franchises, and wholesale enterprises
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60">
              <span className="text-sm font-bold tracking-wider text-slate-300">PANAMA LOGISTICS HUB</span>
              <span className="text-sm font-bold tracking-wider text-slate-300">ALBROOK RETAIL GROUP</span>
              <span className="text-sm font-bold tracking-wider text-slate-300">PACIFICO FOOD CORRIDOR</span>
              <span className="text-sm font-bold tracking-wider text-slate-300">COSTA DEL ESTE MED</span>
              <span className="text-sm font-bold tracking-wider text-slate-300">METRO DISTRIBUTORS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Platform Interactive Showcase */}
      <section id="platform" className="py-24 bg-slate-950 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Architecture & Capabilities
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Deep, purpose-built engines for every department.
            </p>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Click through the core engines below to explore how KIAAN unifies point-of-sale,
              e-commerce storefronts, customer retention, warehouse operations, and fiscal compliance.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            {[
              { id: 'pos', label: 'Cloud POS', icon: Monitor },
              { id: 'website', label: 'AI Store Builder', icon: Globe },
              { id: 'crm', label: 'CRM & Pipeline', icon: Users },
              { id: 'inventory', label: 'Smart Inventory', icon: Package },
              { id: 'fiscal', label: 'Panama PAC Fiscal', icon: Receipt }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeShowcaseTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveShowcaseTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="mt-8 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                {showcaseContent[activeShowcaseTab].tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 tracking-tight">
                {showcaseContent[activeShowcaseTab].title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                {showcaseContent[activeShowcaseTab].subtitle}
              </p>

              <div className="mt-6 space-y-3.5">
                {showcaseContent[activeShowcaseTab].points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300 leading-snug">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">
                    {showcaseContent[activeShowcaseTab].metric}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {showcaseContent[activeShowcaseTab].metricLabel}
                  </p>
                </div>
                <Link
                  href={`/${activeShowcaseTab === 'website' ? 'website' : activeShowcaseTab}`}
                  className="ml-auto inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Launch {activeShowcaseTab.toUpperCase()} Module</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Interactive Visual Card */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <span className="text-xs font-mono text-slate-400">STATUS: CONNECTED & SYNCED</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  REAL-TIME
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Location Node:</span>
                  <span className="text-white font-semibold">Panama City HQ & Multi-Store</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Database Engine:</span>
                  <span className="text-white font-semibold">Multi-Tenant Isolated Partition</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Encryption:</span>
                  <span className="text-emerald-400 font-semibold">AES-256 TLS 1.3 Strict</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">PAC Provider:</span>
                  <span className="text-blue-400 font-semibold">The Factory HKA / Digifact</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 text-xs text-slate-300 flex items-center justify-between">
                <span>Try the full workspace in interactive demo mode:</span>
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0"
                >
                  Test Module →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Core Modules Grid */}
      <section id="modules" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Unified Suite
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            12 Essential Modules. Zero Integration Hassle.
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Every module is designed to speak to the rest of the system automatically.
            When an item sells on your web shop, POS inventory adjusts, accounting updates, and PAC transmits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 hover:bg-slate-850 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {mod.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <Link
                    href={mod.path}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Open Module Interface</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-20 bg-slate-950/80 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Simple 4-Step Onboarding
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From zero to running your business in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Create Business',
                desc: 'Enter your business name, Panama RUC/DV, country, and branch locations.'
              },
              {
                step: '02',
                title: 'Configure Modules',
                desc: 'Toggle the exact tools you need: POS, E-commerce, Inventory, Delivery, or HR.'
              },
              {
                step: '03',
                title: 'Run Omnichannel Sales',
                desc: 'Sell via web store, WhatsApp payment links, or cloud touch POS registers.'
              },
              {
                step: '04',
                title: 'Scale with AI Insights',
                desc: 'Let our AI Copilot draft campaigns, manage stock buffers, and report profit.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative">
                <span className="text-3xl font-extrabold font-mono text-blue-500/30">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-white mt-3">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-md shadow-blue-600/30"
            >
              <span>Test Complete 10-Step Onboarding Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. AI Section */}
      <section id="ai" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="bg-gradient-to-br from-blue-950/80 via-slate-900 to-indigo-950/80 p-8 sm:p-14 rounded-3xl border border-blue-500/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Embedded Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                An AI Copilot embedded inside your business operations.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                Not a standalone chat window, but intelligent automation integrated into your workflows.
                Our AI Copilot monitors inventory, generates SEO-optimized product pages, drafts WhatsApp campaigns,
                and prepares fiscal tax summaries.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { title: 'AI Website & Storefront Generation', desc: 'Creates complete, responsive catalogs and landing pages from simple prompts.' },
                  { title: 'AI Product Copy & SEO Generator', desc: 'Instantly crafts high-converting descriptions, meta tags, and Spanish/English variants.' },
                  { title: 'Predictive Stock & Reorder Forecasting', desc: 'Predicts exact stock-out dates based on velocity and drafts supplier POs.' },
                  { title: 'Smart WhatsApp Marketing Assistant', desc: 'Personalizes promotional broadcast templates tailored to customer purchase history.' }
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{f.title}</h4>
                      <p className="text-xs text-slate-400">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Simulated Prompt Box */}
            <div className="bg-slate-950/90 rounded-2xl border border-blue-500/30 p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>KIAAN AI Copilot</span>
                </div>
                <span className="text-[10px] font-mono bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded">
                  MODEL: BUSINESS-LLM-v3
                </span>
              </div>

              {/* Chat exchange */}
              <div className="mt-4 space-y-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Store Owner Prompt</span>
                  "Analyze our top 3 branches this weekend and draft a WhatsApp campaign for VIP clients with 15% discount on headphones."
                </div>

                <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-500/30 text-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-blue-400 uppercase block">Copilot Output (Generated in 1.1s)</span>
                  <p className="leading-relaxed">
                    📊 <strong>Performance Insight:</strong> Multiplaza branch had the highest footfall ($12,400 sales), while Albrook led in transaction velocity.
                  </p>
                  <p className="leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300">
                    "Hola [Client_Name]! 🎧 Exclusive VIP Alert: Enjoy 15% OFF our OmniSmart Pro & Studio Wireless headphones this weekend only. Show this WhatsApp or order with code VIPAUDIO at checkout. Valid at all branches!"
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-semibold">
                      Send to 342 VIPs
                    </button>
                    <button className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px]">
                      Edit Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive ROI Calculator */}
      <section id="roi" className="py-24 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Measurable Business ROI
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calculate your exact savings with KIAAN.
            </p>
            <p className="mt-4 text-sm sm:text-base text-slate-400">
              Adjust the sliders below to match your monthly operations and see how much you save
              compared to running separate POS, CRM, e-commerce, and HR softwares.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Monthly Customer Orders:</span>
                  <span className="text-blue-400 font-mono text-sm">{roiOrders.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={roiOrders}
                  onChange={(e) => setRoiOrders(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Average Order Value (AOV):</span>
                  <span className="text-blue-400 font-mono text-sm">${roiAov}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={roiAov}
                  onChange={(e) => setRoiAov(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Number of Employees & Cashiers:</span>
                  <span className="text-blue-400 font-mono text-sm">{roiEmployees}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={roiEmployees}
                  onChange={(e) => setRoiEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Branches / Store Locations:</span>
                  <span className="text-blue-400 font-mono text-sm">{roiBranches}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={roiBranches}
                  onChange={(e) => setRoiBranches(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Replaced Disparate Tools:</span>
                <p className="mt-1">Shopify ($79) + Toast POS ($149) + HubSpot CRM ($189) + Deputy HR ($120) + Mailchimp ($75) + Zapier integrations.</p>
              </div>
            </div>

            {/* Calculation Output Card */}
            <div className="bg-gradient-to-br from-blue-950/70 to-slate-950 p-6 sm:p-8 rounded-2xl border border-blue-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Estimated Financial Impact
                </span>

                <div className="mt-6">
                  <p className="text-xs text-slate-400">Total Annual Subscription & Admin Savings</p>
                  <p className="text-4xl sm:text-5xl font-black text-white mt-1">
                    ${annualSavings.toLocaleString()}
                    <span className="text-base text-emerald-400 font-semibold ml-2">/year</span>
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">Monthly Revenue Run-Rate</p>
                    <p className="text-xl font-bold text-white mt-1">${monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">Staff Hours Saved / Mo</p>
                    <p className="text-xl font-bold text-emerald-400 mt-1">{estimatedHoursSaved} Hours</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-6 leading-relaxed">
                  *Based on average SaaS vendor consolidation metrics across retail, omnichannel commerce, and Panama fiscal billing compliance.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <Link
                  href="/signup"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
                >
                  <span>Lock In These Savings With Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            All-in-one value with no hidden per-seat traps.
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Every plan includes our core modules, unlimited products, and free updates.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-8 inline-flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                billingCycle === 'annual' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Starter</h3>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-semibold">
                  Small Business
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Ideal for single-store retail, boutique shops, and emerging brands.
              </p>

              <div className="mt-6">
                <span className="text-4xl font-black text-white">
                  ${billingCycle === 'annual' ? '39' : '49'}
                </span>
                <span className="text-xs text-slate-400 ml-1">/month</span>
              </div>

              <div className="mt-8 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> 1 Branch & 2 Cloud POS Registers
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Full E-commerce & Storefront Builder
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Panama PAC Electronic Invoicing
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> CRM & WhatsApp Payment Links
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Up to 5 Team Members
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs text-center transition-colors border border-slate-700 block"
            >
              Start 7-Day Free Trial
            </Link>
          </div>

          {/* Growth Plan (Popular) */}
          <div className="bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-900 rounded-3xl border-2 border-blue-500 p-8 flex flex-col justify-between relative shadow-xl shadow-blue-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular Choice
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Growth</h3>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full font-semibold border border-blue-500/30">
                  Multi-Location
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Designed for multi-branch retailers, restaurants, and growing wholesalers.
              </p>

              <div className="mt-6">
                <span className="text-4xl font-black text-white">
                  ${billingCycle === 'annual' ? '119' : '149'}
                </span>
                <span className="text-xs text-slate-400 ml-1">/month</span>
              </div>

              <div className="mt-8 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Up to 5 Branches & 10 POS Registers
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Multi-Warehouse Stock & Transfers
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> AI Website & Copy Generator
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Delivery Dispatch & Driver Route Board
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Tablet Attendance Dynamic QR Kiosk
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Up to 25 Staff Accounts
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center transition-all shadow-md shadow-blue-600/30 block"
            >
              Start 7-Day Free Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Enterprise</h3>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-semibold">
                  Full Scale
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                For large commercial chains, regional distributors, and enterprise franchises.
              </p>

              <div className="mt-6">
                <span className="text-4xl font-black text-white">
                  ${billingCycle === 'annual' ? '319' : '399'}
                </span>
                <span className="text-xs text-slate-400 ml-1">/month</span>
              </div>

              <div className="mt-8 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Unlimited Branches & Unlimited POS
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Dedicated PAC Transmit Cluster
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Custom Domain & White-Label Branding
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Unlimited Staff Accounts & Custom RBAC
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> 24/7 Dedicated Account Concierge
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs text-center transition-colors border border-slate-700 block"
            >
              Contact Enterprise Sales
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Customer Success
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white tracking-tight">
              Trusted by 1,200+ forward-thinking businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Replacing Toast and Shopify with KIAAN cut our operational software costs by 70%. Having our POS, web store, and Panama PAC invoices connected in one screen is pure magic.",
                author: "Carlos De La Guardia",
                role: "Founder, Gourmet Market Panama",
                metric: "+34% Faster Checkout"
              },
              {
                quote: "Our stock synchronization between our Costa del Este boutique and the Multiplaza store used to be a weekly nightmare. With KIAAN, inventory is accurate down to the single unit.",
                author: "Sofia Morales",
                role: "Director of Retail, Modas Del Caribe",
                metric: "Zero Stock-out Overlaps"
              },
              {
                quote: "The Panama electronic invoicing alone paid for itself. Every POS receipt generates compliant CUFE codes instantly without clunky external fiscal printers breaking down.",
                author: "Roberto Chen",
                role: "General Manager, Pacific Tech Wholesale",
                metric: "100% Fiscal Compliance"
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{t.author}</p>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    {t.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Got Questions?
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-blue-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-850 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Final High-Impact CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border-t border-blue-500/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to unify your business on one modern operating system?
          </h2>
          <p className="mt-4 text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of retail, food, and e-commerce companies operating with greater efficiency,
            zero disconnected spreadsheets, and complete tax peace of mind.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Start Your 7-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all"
            >
              Launch Live Application Demo
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Complete Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                OS
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                KIAAN <span className="text-blue-400 font-semibold text-xs">SaaS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              The modern Business Operating System uniting digital commerce, cloud POS, CRM,
              and Panama DGI Factura Electrónica PAC for high-growth enterprises.
            </p>
            <p className="text-[11px] text-slate-300">
              © 2026 KIAAN Technologies Inc. All rights reserved.
            </p>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/pos" className="hover:text-white transition-colors">Cloud POS</Link></li>
              <li><Link href="/ecommerce" className="hover:text-white transition-colors">Ecommerce Store</Link></li>
              <li><Link href="/website" className="hover:text-white transition-colors">AI Site Builder</Link></li>
              <li><Link href="/fiscal" className="hover:text-white transition-colors">Panama PAC Fiscal</Link></li>
              <li><Link href="/inventory" className="hover:text-white transition-colors">Inventory & Bin Map</Link></li>
              <li><Link href="/attendance" className="hover:text-white transition-colors">Dynamic QR Kiosk</Link></li>
            </ul>
          </div>

          {/* Solutions by Industry */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/branches" className="hover:text-white transition-colors">Multi-Store Retail</Link></li>
              <li><Link href="/purchasing" className="hover:text-white transition-colors">Wholesale & Imports</Link></li>
              <li><Link href="/delivery" className="hover:text-white transition-colors">Delivery Logistics</Link></li>
              <li><Link href="/crm" className="hover:text-white transition-colors">B2B Deal Pipeline</Link></li>
              <li><Link href="/marketing" className="hover:text-white transition-colors">WhatsApp Marketing</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Internal Dashboard</Link></li>
              <li><Link href="/settings" className="hover:text-white transition-colors">Settings & RBAC</Link></li>
              <li><Link href="/audit-logs" className="hover:text-white transition-colors">Compliance Audit Logs</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Help & Concierge</Link></li>
              <li><Link href="/modules-config" className="hover:text-white transition-colors">Module Activation</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-300">
          <div>DGI Autorizado PAC Proveedor: The Factory HKA / Digifact Integrations</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security Whitepaper</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
