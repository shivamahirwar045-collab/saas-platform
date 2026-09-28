'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useSaaS } from '../../context/SaaSContext';
import { MarketingCampaign } from '../../types/saas';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import {
  Megaphone,
  Plus,
  Sparkles,
  Phone,
  Mail,
  Check,
  X,
  Search,
  Clock,
  ArrowRight,
  Share2
} from '../../components/icons';
import { mockMarketingCampaigns } from '../../data/mockData';

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(mockMarketingCampaigns);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'whatsapp' | 'loyalty'>('campaigns');

  // New Campaign Modal / Wizard
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    channel: 'WhatsApp' as const,
    audience: 'VIP & High Spenders',
    content: '🎉 Estimado cliente de Acme Retail: Descubra nuestras nuevas laptops UltraBook Pro X1 Carbon con entrega express hoy mismo. Use su cupón VIP-CLIENT-50.',
    scheduledDate: '2026-10-05'
  });

  const [aiGenerating, setAiGenerating] = useState(false);

  const handleGenerateAiCopy = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setCampaignForm({
        ...campaignForm,
        content: `⚡ Oferta Exclusiva para Empresas en Panamá: Renueve los puestos de trabajo de su oficina con monitores 4K y sillas ergonómicas ErgoWave. Facturación fiscal electrónica con CUFE y entrega express. ¡Consulte hoy con un asesor!`
      });
      setAiGenerating(false);
    }, 900);
  };

  const handleLaunchCampaign = () => {
    const newCamp: MarketingCampaign = {
      id: `camp_${Date.now()}`,
      name: campaignForm.name,
      channel: campaignForm.channel,
      targetAudience: campaignForm.audience,
      status: 'Active',
      sentCount: 1250,
      openRate: 92.4,
      clickRate: 31.8,
      conversions: 42,
      scheduledDate: campaignForm.scheduledDate
    };

    setCampaigns([newCamp, ...campaigns]);
    setIsWizardOpen(false);
    setWizardStep(1);
  };

  const campaignColumns: Column<MarketingCampaign>[] = [
    {
      header: 'Campaign Name',
      cell: (c) => (
        <div>
          <span className="font-bold text-slate-900">{c.name}</span>
          <p className="text-[10px] text-slate-400">Target: {c.targetAudience}</p>
        </div>
      )
    },
    {
      header: 'Channel',
      cell: (c) => (
        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
          {c.channel === 'WhatsApp' ? '📱 WhatsApp' : c.channel === 'Email' ? '📧 Email' : '💬 SMS'}
        </span>
      )
    },
    {
      header: 'Audience Reach',
      cell: (c) => <span>{c.sentCount.toLocaleString()} contacts</span>
    },
    {
      header: 'Open / Read Rate',
      cell: (c) => <span className="font-bold text-emerald-600">{c.openRate}%</span>
    },
    {
      header: 'Conversions',
      cell: (c) => <span className="font-bold text-blue-600">{c.conversions} orders</span>
    },
    {
      header: 'Status',
      cell: (c) => (
        <Badge variant={c.status === 'Active' ? 'success' : c.status === 'Scheduled' ? 'info' : 'default'}>
          {c.status}
        </Badge>
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
              Marketing Automations &amp; WhatsApp Bot
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Automated customer communication via WhatsApp, targeted email blasts, coupons, and AI copy generation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setWizardStep(1);
                setIsWizardOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Launch Campaign</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Messages Dispatched"
            value="10,450"
            subtitle="Across WhatsApp &amp; Email"
            icon={<Megaphone className="w-5 h-5" />}
          />
          <StatCard
            title="Avg. Open Rate"
            value="79.6%"
            isPositive={true}
            subtitle="Led by WhatsApp Broadcast"
            icon={<Phone className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Campaign Revenue"
            value="$42,800"
            isPositive={true}
            subtitle="Attributed purchases"
            icon={<Sparkles className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Loyalty Members"
            value="420 Accounts"
            subtitle="Active points rewards"
            icon={<Check className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'campaigns' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-4 h-4" /> All Campaigns ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'whatsapp' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Phone className="w-4 h-4" /> WhatsApp Templates &amp; Bot
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'loyalty' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Loyalty Points Program
          </button>
        </div>

        {/* TAB 1: CAMPAIGNS TABLE */}
        {activeTab === 'campaigns' && (
          <DataTable
            data={campaigns}
            columns={campaignColumns}
            searchPlaceholder="Search campaigns by name or channel..."
            title="Active &amp; Completed Outreaches"
            subtitle="Track conversion velocity from automated customer touches"
          />
        )}

        {/* TAB 2: WHATSAPP */}
        {activeTab === 'whatsapp' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
              <h3 className="text-base font-bold text-slate-900">Approved Meta WhatsApp Templates</h3>
              <p className="text-slate-500">
                Templates compliant with Meta Business policies for utility order notifications and marketing updates.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                  <div className="flex justify-between items-center font-bold text-emerald-900">
                    <span>Order Confirmation &amp; PAC Fiscal Slip</span>
                    <span className="text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded">Utility</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    &quot;Hola {'{{1}}'}, tu orden {'{{2}}'} en Acme Retail ha sido procesada con éxito. Puedes consultar tu factura fiscal autorizada por la DGI aquí: {'{{3}}'}&quot;
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
                  <div className="flex justify-between items-center font-bold text-blue-900">
                    <span>Out for Delivery Courier Notification</span>
                    <span className="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded">Utility</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    &quot;Tu pedido {'{{1}}'} va en camino con el repartidor {'{{2}}'}. Tiempo estimado de llegada: {'{{3}}'}.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated WhatsApp Phone Frame */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between max-w-sm mx-auto">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                  WA
                </div>
                <div>
                  <p className="text-xs font-bold">Acme Retail Official</p>
                  <p className="text-[10px] text-emerald-400">Verified Business Account</p>
                </div>
              </div>

              <div className="py-6 space-y-2.5 text-xs">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-xs max-w-[90%] text-slate-200 space-y-1">
                  <p className="font-semibold text-emerald-400">Acme Retail &amp; Tech</p>
                  <p className="text-[11px] leading-relaxed">
                    Hola Roberto, tu orden ORD-2026-0891 ha sido despachada. Factura DGI CUFE-PA-000101-891044 adjunta.
                  </p>
                  <span className="text-[9px] text-slate-500 float-right">10:15 AM ✓✓</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-center text-[10px] text-slate-500">
                Simulated Client Mobile Screen
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOYALTY */}
        {activeTab === 'loyalty' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Customer Loyalty Rewards &amp; Point Tiers</h3>
            <p className="text-slate-500">Reward frequent shoppers at physical POS registers and online storefronts.</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                <span className="font-bold text-slate-800">Silver Member</span>
                <p className="text-[11px] text-slate-400">Spend &gt; $500</p>
                <p className="text-blue-600 font-bold">1 Point / $10</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center space-y-1">
                <span className="font-bold text-blue-900">Gold VIP</span>
                <p className="text-[11px] text-blue-600">Spend &gt; $2,500</p>
                <p className="text-blue-700 font-bold">2 Points / $10</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-center space-y-1">
                <span className="font-bold text-purple-900">Platinum Elite</span>
                <p className="text-[11px] text-purple-600">Spend &gt; $10,000</p>
                <p className="text-purple-700 font-bold">3 Points / $10</p>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CAMPAIGN WIZARD */}
        {isWizardOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Campaign Creation Wizard</h3>
                  <p className="text-xs text-slate-400">Step {wizardStep} of 3</p>
                </div>
                <button onClick={() => setIsWizardOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {wizardStep === 1 && (
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Campaign Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. October Corporate Fleet Flash Sale"
                      value={campaignForm.name}
                      onChange={e => setCampaignForm({ ...campaignForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Outreach Channel</label>
                      <select
                        value={campaignForm.channel}
                        onChange={e => setCampaignForm({ ...campaignForm, channel: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                      >
                        <option value="WhatsApp">WhatsApp Broadcast</option>
                        <option value="Email">Email Newsletter</option>
                        <option value="SMS">SMS Flash</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Target Audience</label>
                      <select
                        value={campaignForm.audience}
                        onChange={e => setCampaignForm({ ...campaignForm, audience: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                      >
                        <option value="VIP & High Spenders">VIP &amp; High Spenders</option>
                        <option value="Corporate B2B Legal">Corporate B2B Legal</option>
                        <option value="All Registered Shoppers">All Registered Shoppers</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="block text-slate-700 font-semibold">Message Copy / Content</label>
                    <button
                      type="button"
                      onClick={handleGenerateAiCopy}
                      disabled={aiGenerating}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{aiGenerating ? 'AI Crafting...' : 'AI Enhance Copy'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={4}
                    value={campaignForm.content}
                    onChange={e => setCampaignForm({ ...campaignForm, content: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none text-slate-800"
                  />
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-1.5">
                    <span className="font-bold text-slate-900">Campaign Review</span>
                    <p><strong>Title:</strong> {campaignForm.name}</p>
                    <p><strong>Channel:</strong> {campaignForm.channel}</p>
                    <p><strong>Audience:</strong> {campaignForm.audience}</p>
                    <p><strong>Schedule:</strong> {campaignForm.scheduledDate}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                    Ready to schedule and broadcast to 1,250 verified contacts.
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(s => s - 1)}
                    className="px-3.5 py-1.5 text-xs text-slate-600"
                  >
                    Back
                  </button>
                ) : <div></div>}

                {wizardStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (!campaignForm.name && wizardStep === 1) return;
                      setWizardStep(s => s + 1);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleLaunchCampaign}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Launch Campaign
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
