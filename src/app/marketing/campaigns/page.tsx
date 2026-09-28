'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { useToast } from '@/components/ui/Toast';
import {
  Megaphone,
  Plus,
  Sparkles,
  Phone,
  Mail,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Copy,
  Users,
  Eye,
  BarChart3,
  Calendar,
  X
} from '@/components/icons';

interface CampaignItem {
  id: string;
  name: string;
  channel: 'WhatsApp' | 'Email' | 'SMS' | 'Push Notification';
  segment: string;
  segmentCount: number;
  scheduledDate: string;
  status: 'Active' | 'Scheduled' | 'Completed' | 'Draft' | 'Paused';
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    conversions: number;
    revenue: number;
  };
  content: string;
}

const initialCampaigns: CampaignItem[] = [
  {
    id: 'camp-101',
    name: 'Panama Independence Flash Sale 2026',
    channel: 'WhatsApp',
    segment: 'VIP & High Spenders',
    segmentCount: 1420,
    scheduledDate: '2026-10-01 10:00 AM',
    status: 'Active',
    metrics: {
      sent: 1420,
      delivered: 1402,
      opened: 1340,
      clicked: 490,
      conversions: 84,
      revenue: 16580.00
    },
    content: '🇵🇦 ¡Celebre las Fiestas Patrias con KIAAN! 25% de descuento en accesorios de tecnología y entregas gratis en Ciudad de Panamá. Use código PATRIA26.'
  },
  {
    id: 'camp-102',
    name: 'Cart Recovery Sequence - Tech Laptops',
    channel: 'WhatsApp',
    segment: 'Abandoned Cart 24h',
    segmentCount: 380,
    scheduledDate: 'Automated Trigger',
    status: 'Active',
    metrics: {
      sent: 380,
      delivered: 376,
      opened: 350,
      clicked: 142,
      conversions: 45,
      revenue: 29400.00
    },
    content: 'Hola {first_name}, notamos que dejaste tu pedido en el carrito. Tu cotización con ITBMS incluido y delivery express está reservada por 6 horas más.'
  },
  {
    id: 'camp-103',
    name: 'B2B Corporate Equipment Leasing Newsletter',
    channel: 'Email',
    segment: 'Enterprise Accounts (RUC)',
    segmentCount: 5200,
    scheduledDate: '2026-09-25 09:00 AM',
    status: 'Completed',
    metrics: {
      sent: 5200,
      delivered: 5120,
      opened: 2450,
      clicked: 680,
      conversions: 19,
      revenue: 38200.00
    },
    content: 'Soluciones de hardware y mobiliario corporativo con factura fiscal electrónica CUFE y financiamiento a 30 días.'
  },
  {
    id: 'camp-104',
    name: 'Weekend Store Flash Deal SMS',
    channel: 'SMS',
    segment: 'Walk-in Retail Shoppers',
    segmentCount: 2900,
    scheduledDate: '2026-10-04 11:30 AM',
    status: 'Scheduled',
    metrics: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      revenue: 0.00
    },
    content: 'KIAAN: Visita hoy Multiplaza y recibe un 15% OFF mostrando este SMS en caja antes de las 6PM.'
  },
  {
    id: 'camp-105',
    name: 'VIP Loyalty Tier Upgrade Notice',
    channel: 'WhatsApp',
    segment: 'Loyalty Club - Gold',
    segmentCount: 650,
    scheduledDate: '2026-09-20 14:00 PM',
    status: 'Completed',
    metrics: {
      sent: 650,
      delivered: 648,
      opened: 635,
      clicked: 290,
      conversions: 72,
      revenue: 12450.00
    },
    content: '¡Felicidades {first_name}! Has calificado al Tier Platinum de KIAAN Rewards. Tienes $50 de saldo aplicable en cualquier sucursal.'
  }
];

export default function MarketingCampaignsPage() {
  const { addToast } = useToast();
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(initialCampaigns);
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [detailCampaign, setDetailCampaign] = useState<CampaignItem | null>(null);

  // Create Campaign State
  const [formName, setFormName] = useState('');
  const [formChannel, setFormChannel] = useState<'WhatsApp' | 'Email' | 'SMS' | 'Push Notification'>('WhatsApp');
  const [formSegment, setFormSegment] = useState('VIP & High Spenders');
  const [formContent, setFormContent] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.segment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = selectedChannel === 'All' || c.channel === selectedChannel;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  // KPIs
  const totalSent = campaigns.reduce((acc, c) => acc + c.metrics.sent, 0);
  const totalOpened = campaigns.reduce((acc, c) => acc + c.metrics.opened, 0);
  const avgOpenRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.metrics.revenue, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.metrics.conversions, 0);

  const handleAiCopy = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      if (formChannel === 'WhatsApp') {
        setFormContent(`🔥 ¡Hola {first_name}! Tenemos una promoción relámpago en KIAAN: hasta 30% en notebooks y accesorios con factura electrónica CUFE garantizada. ¿Deseas que te enviemos el catálogo en PDF ahora mismo?`);
      } else if (formChannel === 'Email') {
        setFormContent(`Estimado/a {first_name},\n\nConozca nuestras soluciones exclusivas para su empresa este mes. Disfrute de condiciones preferenciales, crédito fiscal ITBMS y logística de entrega en menos de 24 horas.`);
      } else {
        setFormContent(`KIAAN Alerta: {first_name}, tu cupón VIP de 20% expira hoy. Ingresa a kiaan.pa con el código FLASH20.`);
      }
      setIsAiGenerating(false);
      addToast('AI Marketing Copilot generated high-converting copy', 'success');
    }, 800);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const newCamp: CampaignItem = {
      id: `camp-${Date.now().toString().slice(-4)}`,
      name: formName,
      channel: formChannel,
      segment: formSegment,
      segmentCount: formSegment.includes('VIP') ? 1450 : formSegment.includes('Enterprise') ? 5200 : 890,
      scheduledDate: '2026-10-06 09:00 AM',
      status: 'Scheduled',
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        conversions: 0,
        revenue: 0.00
      },
      content: formContent || 'Promotional message dispatched via verified business channel.'
    };

    setCampaigns([newCamp, ...campaigns]);
    setIsCreateOpen(false);
    setFormName('');
    setFormContent('');
    addToast(`Campaign "${newCamp.name}" scheduled successfully`, 'success');
  };

  const handleDuplicate = (c: CampaignItem) => {
    const dup: CampaignItem = {
      ...c,
      id: `camp-${Date.now().toString().slice(-4)}`,
      name: `${c.name} (Copy)`,
      status: 'Draft',
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        conversions: 0,
        revenue: 0.00
      }
    };
    setCampaigns([dup, ...campaigns]);
    addToast(`Duplicated campaign into Draft: ${dup.name}`, 'info');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Marketing Campaigns Hub</h1>
            <p className="text-sm text-slate-500">
              Launch and orchestrate omnichannel WhatsApp, Email newsletters, SMS alerts, and personalized retargeting.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/marketing/templates'}>
              View Message Templates
            </Button>
            <Button size="sm" onClick={() => setIsCreateOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Create Campaign
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Messages Dispatched"
            value={totalSent.toLocaleString()}
            subtitle="Across WhatsApp & Email"
            icon={<Megaphone className="w-5 h-5 text-indigo-600" />}
          />
          <StatCard
            title="Omnichannel Open Rate"
            value={`${avgOpenRate}%`}
            subtitle="WhatsApp avg 94.2%"
            icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
          />
          <StatCard
            title="Total Conversions"
            value={totalConversions}
            subtitle="Completed checkout orders"
            icon={<Users className="w-5 h-5 text-blue-600" />}
          />
          <StatCard
            title="Attributed Sales Revenue"
            value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            subtitle="Tracking pixel & UTM tags"
            icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
          />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search campaigns or target segment..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>

            <Select
              value={selectedChannel}
              onChange={e => setSelectedChannel(e.target.value)}
              options={[
                { value: 'All', label: 'All Channels' },
                { value: 'WhatsApp', label: 'WhatsApp Broadcast' },
                { value: 'Email', label: 'Email Newsletter' },
                { value: 'SMS', label: 'SMS Blast' },
                { value: 'Push Notification', label: 'Push Notification' }
              ]}
            />

            <Select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'Active', label: 'Active' },
                { value: 'Scheduled', label: 'Scheduled' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Draft', label: 'Draft' }
              ]}
            />
          </div>

          <div className="text-xs text-slate-500 whitespace-nowrap">
            Showing {filteredCampaigns.length} campaigns
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Campaign Name & Segment</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Schedule / Trigger</th>
                  <th className="py-3 px-4">Funnel (Sent / Opened / CTR)</th>
                  <th className="py-3 px-4">Attributed Sales</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCampaigns.map(camp => {
                  const openPct = camp.metrics.sent > 0 ? Math.round((camp.metrics.opened / camp.metrics.sent) * 100) : 0;
                  const clickPct = camp.metrics.opened > 0 ? Math.round((camp.metrics.clicked / camp.metrics.opened) * 100) : 0;

                  return (
                    <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{camp.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Users className="w-3 h-3 text-slate-400" />
                          <span>{camp.segment}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                            {camp.segmentCount.toLocaleString()} leads
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          camp.channel === 'WhatsApp' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          camp.channel === 'Email' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {camp.channel === 'WhatsApp' && <Phone className="w-3 h-3" />}
                          {camp.channel === 'Email' && <Mail className="w-3 h-3" />}
                          {camp.channel === 'SMS' && <Megaphone className="w-3 h-3" />}
                          {camp.channel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 font-mono">
                        {camp.scheduledDate}
                      </td>
                      <td className="py-3.5 px-4">
                        {camp.metrics.sent > 0 ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-bold text-slate-800">{camp.metrics.sent.toLocaleString()} sent</span>
                              <span className="text-slate-400">•</span>
                              <span className="text-emerald-700 font-semibold">{openPct}% open</span>
                              <span className="text-slate-400">•</span>
                              <span className="text-indigo-600 font-semibold">{clickPct}% CTR</span>
                            </div>
                            <div className="w-36 h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                              <div style={{ width: `${openPct}%` }} className="bg-emerald-500 h-full" />
                              <div style={{ width: `${clickPct}%` }} className="bg-indigo-500 h-full" />
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Pending launch</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 text-xs">
                        {camp.metrics.revenue > 0 ? (
                          <span className="text-emerald-600">
                            ${camp.metrics.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        ) : (
                          <span className="text-slate-400">$0.00</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {camp.status === 'Active' && <Badge variant="success">Active</Badge>}
                        {camp.status === 'Scheduled' && <Badge variant="primary">Scheduled</Badge>}
                        {camp.status === 'Completed' && <Badge variant="secondary">Completed</Badge>}
                        {camp.status === 'Draft' && <Badge variant="warning">Draft</Badge>}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => setDetailCampaign(camp)} title="View Funnel Analytics">
                            <BarChart3 className="w-4 h-4 text-slate-600" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDuplicate(camp)} title="Duplicate Campaign">
                            <Copy className="w-4 h-4 text-slate-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Campaign Modal */}
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Create Omnichannel Campaign"
        >
          <form onSubmit={handleCreateCampaign} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Campaign Title</label>
              <Input
                placeholder="e.g. Black Friday VIP WhatsApp Blast"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Channel</label>
                <Select
                  value={formChannel}
                  onChange={e => setFormChannel(e.target.value as any)}
                  options={[
                    { value: 'WhatsApp', label: 'WhatsApp Official API' },
                    { value: 'Email', label: 'Email Newsletter (SendGrid)' },
                    { value: 'SMS', label: 'SMS Blast (Twilio)' },
                    { value: 'Push Notification', label: 'Web/App Push Notification' }
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Segment</label>
                <Select
                  value={formSegment}
                  onChange={e => setFormSegment(e.target.value)}
                  options={[
                    { value: 'VIP & High Spenders', label: 'VIP & High Spenders (1,450)' },
                    { value: 'Enterprise Accounts (RUC)', label: 'Enterprise Accounts (5,200)' },
                    { value: 'Abandoned Cart 24h', label: 'Abandoned Cart 24h (380)' },
                    { value: 'All Registered Customers', label: 'All Registered Customers (9,840)' }
                  ]}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Message Copy</label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs text-indigo-600 hover:text-indigo-700 h-6 px-2"
                  onClick={handleAiCopy}
                  disabled={isAiGenerating}
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  {isAiGenerating ? 'Drafting copy...' : 'Draft with AI Copilot'}
                </Button>
              </div>
              <textarea
                value={formContent}
                onChange={e => setFormContent(e.target.value)}
                placeholder="Enter message text... Use {first_name} for personalization."
                rows={4}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                required
              />
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                <span>Placeholders:</span>
                <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded cursor-pointer" onClick={() => setFormContent(prev => prev + ' {first_name}')}>
                  {'{first_name}'}
                </code>
                <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded cursor-pointer" onClick={() => setFormContent(prev => prev + ' {company}')}>
                  {'{company}'}
                </code>
                <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded cursor-pointer" onClick={() => setFormContent(prev => prev + ' {discount_code}')}>
                  {'{discount_code}'}
                </code>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="font-semibold text-slate-700">Compliance & Regulatory Check:</div>
              <p className="text-slate-500 text-[11px]">
                Messages automatically append required unsubscribe links and opt-out commands in compliance with Panama Law 81 of Personal Data Protection.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Schedule & Validate Campaign
              </Button>
            </div>
          </form>
        </Modal>

        {/* Campaign Analytics Drawer */}
        <Drawer
          isOpen={!!detailCampaign}
          onClose={() => setDetailCampaign(null)}
          title={`Analytics: ${detailCampaign?.name}`}
          size="lg"
        >
          {detailCampaign && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="primary">{detailCampaign.channel}</Badge>
                  <span className="text-xs text-slate-500 font-mono">{detailCampaign.scheduledDate}</span>
                </div>
                <div className="text-sm font-semibold text-slate-800">Target Segment: {detailCampaign.segment}</div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 font-mono">
                  {detailCampaign.content}
                </div>
              </div>

              {/* Conversion Funnel */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Conversion Funnel Breakdown</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-indigo-900">Total Dispatched</div>
                      <div className="text-lg font-bold text-indigo-700">{detailCampaign.metrics.sent.toLocaleString()}</div>
                    </div>
                    <span className="text-xs text-indigo-600 font-medium">100% Target</span>
                  </div>

                  <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-blue-900">Delivered & Received</div>
                      <div className="text-lg font-bold text-blue-700">{detailCampaign.metrics.delivered.toLocaleString()}</div>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">
                      {detailCampaign.metrics.sent > 0 ? Math.round((detailCampaign.metrics.delivered / detailCampaign.metrics.sent) * 100) : 0}% Delivery
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-emerald-900">Opened / Read</div>
                      <div className="text-lg font-bold text-emerald-700">{detailCampaign.metrics.opened.toLocaleString()}</div>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">
                      {detailCampaign.metrics.sent > 0 ? Math.round((detailCampaign.metrics.opened / detailCampaign.metrics.sent) * 100) : 0}% Open Rate
                    </span>
                  </div>

                  <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-purple-900">Clicked Links / Catalogs</div>
                      <div className="text-lg font-bold text-purple-700">{detailCampaign.metrics.clicked.toLocaleString()}</div>
                    </div>
                    <span className="text-xs text-purple-600 font-medium">
                      {detailCampaign.metrics.opened > 0 ? Math.round((detailCampaign.metrics.clicked / detailCampaign.metrics.opened) * 100) : 0}% CTR
                    </span>
                  </div>

                  <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-amber-900">Purchases & Attributed Revenue</div>
                      <div className="text-lg font-bold text-amber-700">
                        {detailCampaign.metrics.conversions} orders (${detailCampaign.metrics.revenue.toLocaleString()})
                      </div>
                    </div>
                    <span className="text-xs text-amber-700 font-bold">ROAS: 14.2x</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <Button variant="outline" onClick={() => setDetailCampaign(null)}>
                  Close Analytics
                </Button>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </AppShell>
  );
}
