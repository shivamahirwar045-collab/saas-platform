'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import {
  Sparkles,
  Check,
  ArrowRight,
  Globe,
  ShoppingCart,
  Monitor,
  CreditCard,
  Truck,
  RefreshCw,
  Building2,
  CheckCircle,
  Eye,
  Sliders
} from '@/components/icons';
import Link from 'next/link';

export default function OnboardingPage() {
  const { currentBusiness, setCurrentBusiness } = useSaaS();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [accountForm, setAccountForm] = useState({
    name: 'Alexander Sterling',
    email: 'alex@acmeretail.com',
    password: '••••••••••••',
    confirmPassword: '••••••••••••'
  });

  const [selectedType, setSelectedType] = useState('Retail');

  const [businessInfo, setBusinessInfo] = useState({
    name: 'Acme Retail & Tech',
    industry: 'Electronics & Lifestyle',
    location: 'Panama City, Panama',
    phone: '+507 390-4400',
    website: 'https://acmeretail.pa',
    currency: 'USD ($)',
    country: 'Panama',
    taxId: '155789012-2-2021',
    dv: '44',
    brandColor: '#2563eb'
  });

  const [initialProducts, setInitialProducts] = useState([
    { name: 'UltraBook Pro X1 Carbon', price: 1899, category: 'Computers' },
    { name: 'AcousticPure Wireless Headphones', price: 349.50, category: 'Audio' },
    { name: 'OmniSmart Watch Series 5', price: 499, category: 'Wearables' }
  ]);

  const [salesChannels, setSalesChannels] = useState({
    ecommerce: true,
    pos: true,
    paymentLinks: true,
    delivery: true,
    catalogOnly: false
  });

  // AI Generation Simulation State
  const [aiStage, setAiStage] = useState(0);
  const aiStages = [
    'Analyzing business model & Panamanian enterprise catalog...',
    'Synthesizing responsive digital presence & SEO structure...',
    'Assembling high-converting Hero, Product and Testimonial sections...',
    'Connecting multi-branch inventory and POS terminal mappings...',
    'Configuring DGI Panama PAC fiscal electronic billing schemas...',
    'Finalizing executive operating dashboard & AI Copilot knowledge base...'
  ];

  useEffect(() => {
    if (currentStep === 6) {
      setAiStage(0);
      const interval = setInterval(() => {
        setAiStage(prev => {
          if (prev < aiStages.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => setCurrentStep(7), 800);
            return prev;
          }
        });
      }, 900);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const businessTypes = [
    { title: 'Retail', icon: '🛍️', desc: 'Physical stores, ecommerce, inventory and barcode scanning' },
    { title: 'Restaurant', icon: '🍽️', desc: 'Dining rooms, kitchen orders, table management and delivery' },
    { title: 'Services', icon: '💼', desc: 'Consulting, appointments, client invoicing and retainers' },
    { title: 'Professional', icon: '⚖️', desc: 'Legal, architectural, accounting and medical practices' },
    { title: 'Distributor', icon: '🏭', desc: 'B2B wholesale, multi-warehouse and high-volume dispatch' },
    { title: 'Agency', icon: '🚀', desc: 'Client marketing retainers, project billing and portals' },
    { title: 'Other', icon: '✨', desc: 'Custom enterprise hybrid configuration' }
  ];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                10-Step Interactive Flow
              </span>
              <span className="text-xs text-slate-400">Step {currentStep} of 10</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              New Business Setup &amp; AI Onboarding Wizard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Guided end-to-end configuration creating digital presence, catalog, POS, and Panama PAC fiscal profiles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 font-mono">
              {Math.round((currentStep / 10) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 10) * 100}%` }}
          ></div>
        </div>

        {/* Step Content Container */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm min-h-[420px] flex flex-col justify-between">
          {/* STEP 1: CREATE ACCOUNT */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 1 — Create Master Account</h2>
                <p className="text-xs text-slate-500 mt-0.5">Set up your tenant owner credentials to govern your business operating system.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={accountForm.name}
                    onChange={e => setAccountForm({ ...accountForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Business Email</label>
                  <input
                    type="email"
                    value={accountForm.email}
                    onChange={e => setAccountForm({ ...accountForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    value={accountForm.password}
                    onChange={e => setAccountForm({ ...accountForm, password: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={accountForm.confirmPassword}
                    onChange={e => setAccountForm({ ...accountForm, confirmPassword: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT BUSINESS TYPE */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 2 — Select Your Industry &amp; Business Type</h2>
                <p className="text-xs text-slate-500 mt-0.5">This customizes your default modules, dashboard KPIs, and POS configuration.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {businessTypes.map(bt => (
                  <div
                    key={bt.title}
                    onClick={() => setSelectedType(bt.title)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedType === bt.title
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{bt.icon}</span>
                      {selectedType === bt.title && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{bt.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{bt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: BUSINESS INFORMATION */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 3 — Business Profile &amp; Panama Fiscal Details</h2>
                <p className="text-xs text-slate-500 mt-0.5">Provide commercial identifiers used in electronic invoices and public receipts.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    value={businessInfo.name}
                    onChange={e => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Industry Focus</label>
                  <input
                    type="text"
                    value={businessInfo.industry}
                    onChange={e => setBusinessInfo({ ...businessInfo, industry: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">RUC (Registro Único de Contribuyente)</label>
                  <input
                    type="text"
                    value={businessInfo.taxId}
                    onChange={e => setBusinessInfo({ ...businessInfo, taxId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">DV (Dígito Verificador)</label>
                  <input
                    type="text"
                    value={businessInfo.dv}
                    onChange={e => setBusinessInfo({ ...businessInfo, dv: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Headquarters Location</label>
                  <input
                    type="text"
                    value={businessInfo.location}
                    onChange={e => setBusinessInfo({ ...businessInfo, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Default Operating Currency</label>
                  <input
                    type="text"
                    value={businessInfo.currency}
                    readOnly
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PRODUCTS / SERVICES */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 4 — Initial Products &amp; Services</h2>
                <p className="text-xs text-slate-500 mt-0.5">Seed your starter catalog. You can add more from the Ecommerce module anytime.</p>
              </div>

              <div className="space-y-3">
                {initialProducts.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-slate-500">Category: {p.category}</p>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">${p.price.toFixed(2)}</span>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setInitialProducts([
                      ...initialProducts,
                      { name: 'ErgoWave Executive Chair', price: 580, category: 'Furniture' }
                    ])
                  }
                  className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 rounded-xl text-xs font-semibold text-slate-500 transition-colors"
                >
                  + Add Another Starter SKU
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SALES CONFIGURATION */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 5 — Sales Channel Configuration</h2>
                <p className="text-xs text-slate-500 mt-0.5">Select how customers will discover, purchase, and pay for your products.</p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { key: 'ecommerce', title: 'Online Ecommerce Storefront', desc: 'Accept credit card orders with shopping cart & automated digital invoicing' },
                  { key: 'pos', title: 'Point of Sale (POS) Hardware', desc: 'Barcode scanning, cash register sessions, and thermal receipt printing' },
                  { key: 'paymentLinks', title: 'WhatsApp & Social Payment Links', desc: 'Create one-click payment URLs with direct Yappy & card gateways' },
                  { key: 'delivery', title: 'Driver Dispatch & Nationwide Delivery', desc: 'Route tracking with proof of delivery signatures & real-time ETA' },
                  { key: 'catalogOnly', title: 'Catalog-Only Mode', desc: 'Display showcase without public checkout (inquire for pricing)' }
                ].map(item => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(salesChannels as any)[item.key]}
                      onChange={e => setSalesChannels({ ...salesChannels, [item.key]: e.target.checked })}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: AI GENERATION SIMULATION */}
          {currentStep === 6 && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20 animate-spin-slow">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  AI Engine Assembling Your SaaS Operating System
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Generating responsive landing pages, configuring Panama PAC fiscal adapters, and initializing multi-tenant registers.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-2 text-left">
                {aiStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs transition-colors ${
                      idx < aiStage
                        ? 'text-emerald-700 bg-emerald-50'
                        : idx === aiStage
                        ? 'text-blue-700 bg-blue-50 font-semibold animate-pulse'
                        : 'text-slate-400 opacity-60'
                    }`}
                  >
                    {idx < aiStage ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : idx === aiStage ? (
                      <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className="truncate">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: PREVIEW */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Step 7 — AI Generated Digital Storefront Preview</h2>
                  <p className="text-xs text-slate-500">Inspect the responsive layout generated for Acme Retail &amp; Tech.</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Ready to Publish
                </span>
              </div>

              {/* Simulated Browser Frame */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-md">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="flex-1 text-center font-mono text-[11px] bg-white py-1 rounded-md text-slate-600 max-w-sm mx-auto">
                    https://acmeretail.saas-platform.com
                  </div>
                </div>

                <div className="p-6 bg-slate-900 text-white space-y-4">
                  <div className="max-w-md space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                      Enterprise Hardware &amp; Ergonomics
                    </span>
                    <h3 className="text-xl font-bold">Empowering Modern Enterprise with Next-Gen Hardware</h3>
                    <p className="text-xs text-slate-300">
                      Official warranties, authorized DGI fiscal invoicing, and same-day express delivery across Panama.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button className="px-4 py-1.5 bg-blue-600 rounded-lg text-xs font-semibold text-white">
                        Explore Catalog
                      </button>
                      <button className="px-4 py-1.5 bg-white/10 rounded-lg text-xs font-semibold text-white">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: EDIT / APPROVE */}
          {currentStep === 8 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 8 — Review &amp; Approve Platform Configuration</h2>
                <p className="text-xs text-slate-500 mt-0.5">Validate the modules activated and confirm operational launch.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900">Active Core Modules</span>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li>✓ Website &amp; Visual Section Builder</li>
                    <li>✓ Omnichannel Ecommerce &amp; POS</li>
                    <li>✓ CRM &amp; Deal Kanban Pipeline</li>
                    <li>✓ Panama DGI PAC Fiscal Billing</li>
                    <li>✓ Multi-Branch Inventory Tracking</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900">Branch Locations Configured</span>
                  <ul className="mt-2 space-y-1 text-slate-600">
                    <li>📍 Main Flagship Store (Calle 50)</li>
                    <li>📍 Multiplaza Pacific Mall Branch</li>
                    <li>📍 Colon Free Zone Distribution Hub</li>
                    <li>📍 David Chiriqui Express Store</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: PUBLISH */}
          {currentStep === 9 && (
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Ready to Publish Live</h2>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Your store and digital presence will be published to the cloud with instant edge SSL encryption.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary Domain:</span>
                  <span className="font-mono font-semibold text-slate-800">acmeretail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SSL Certificate:</span>
                  <span className="text-emerald-600 font-semibold">Active &amp; Managed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PAC Electronic Fiscal:</span>
                  <span className="text-emerald-600 font-semibold">Production Ready</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: CONTINUE WITH AI */}
          {currentStep === 10 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">Setup Complete! Welcome to Your Operating System</h2>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Your business is completely configured. Continue exploring with AI assistants across all modules.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <Link
                  href="/dashboard"
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-colors"
                >
                  <p className="font-bold text-slate-900 text-xs">Open Main Dashboard</p>
                  <p className="text-[11px] text-slate-500 mt-1">Review live KPIs, alerts and executive reports</p>
                </Link>
                <Link
                  href="/pos"
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-colors"
                >
                  <p className="font-bold text-slate-900 text-xs">Launch POS Terminal</p>
                  <p className="text-[11px] text-slate-500 mt-1">Start scanning items and opening cash shifts</p>
                </Link>
                <Link
                  href="/website"
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-colors"
                >
                  <p className="font-bold text-slate-900 text-xs">Visual Page Builder</p>
                  <p className="text-[11px] text-slate-500 mt-1">Customize website sections with AI prompts</p>
                </Link>
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          {currentStep !== 6 && (
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 10 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(s => Math.min(10, s + 1))}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>{currentStep === 9 ? 'Publish Now' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Go to Executive Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
