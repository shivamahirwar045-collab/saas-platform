'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  Zap,
  CheckCircle,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  Sliders,
  AlertTriangle,
  Receipt,
  CreditCard,
  Phone,
  Mail,
  ShoppingCart,
  Lock,
  Globe
} from '@/components/icons';

interface IntegrationApp {
  id: string;
  name: string;
  category: 'Fiscal PAC' | 'Payment Gateway' | 'Communications' | 'E-commerce';
  description: string;
  iconBg: string;
  status: 'Connected' | 'Available' | 'Pending Setup';
  apiUrl?: string;
  webhookStatus?: 'Active (200 OK)' | 'Degraded' | 'Not Configured';
  lastPing?: string;
}

const initialIntegrations: IntegrationApp[] = [
  {
    id: 'pac_digifact',
    name: 'Digifact PAC Panamá',
    category: 'Fiscal PAC',
    description: 'Authorized DGI PAC provider for issuing electronic invoices, credit notes, and XML signatures.',
    iconBg: 'bg-blue-600',
    status: 'Connected',
    apiUrl: 'https://panama.digifact.com.pa/api/v1',
    webhookStatus: 'Active (200 OK)',
    lastPing: '2 mins ago (Latency: 142ms)'
  },
  {
    id: 'pac_hka',
    name: 'The Factory HKA (DGI PAC)',
    category: 'Fiscal PAC',
    description: 'Secondary failover PAC provider for high-volume fiscal receipt stamp processing in Panama.',
    iconBg: 'bg-emerald-700',
    status: 'Available',
    webhookStatus: 'Not Configured'
  },
  {
    id: 'pay_yappy',
    name: 'Yappy Comercial (Banco General)',
    category: 'Payment Gateway',
    description: 'Real-time peer-to-merchant dynamic QR payments and deep-link checkout across Panama.',
    iconBg: 'bg-cyan-600',
    status: 'Connected',
    apiUrl: 'https://api.yappy.bg.com.pa/v2/merchant',
    webhookStatus: 'Active (200 OK)',
    lastPing: '1 min ago (Latency: 88ms)'
  },
  {
    id: 'pay_stripe',
    name: 'Stripe Payments',
    category: 'Payment Gateway',
    description: 'International credit/debit card processing (Visa, Mastercard, Amex) with 3D Secure 2.0.',
    iconBg: 'bg-indigo-600',
    status: 'Connected',
    apiUrl: 'https://api.stripe.com/v1',
    webhookStatus: 'Active (200 OK)',
    lastPing: 'Just now (Latency: 110ms)'
  },
  {
    id: 'comm_whatsapp',
    name: 'Meta WhatsApp Business API',
    category: 'Communications',
    description: 'Official Cloud API for automated dispatch updates, HSM marketing templates, and interactive support.',
    iconBg: 'bg-emerald-600',
    status: 'Connected',
    apiUrl: 'https://graph.facebook.com/v21.0/messages',
    webhookStatus: 'Active (200 OK)',
    lastPing: '4 mins ago (Latency: 95ms)'
  },
  {
    id: 'comm_twilio',
    name: 'Twilio SMS & Voice',
    category: 'Communications',
    description: 'Global SMS broadcast and two-factor PIN verification dispatches.',
    iconBg: 'bg-rose-600',
    status: 'Connected',
    apiUrl: 'https://api.twilio.com/2010-04-01',
    webhookStatus: 'Active (200 OK)',
    lastPing: '10 mins ago (Latency: 180ms)'
  },
  {
    id: 'ecom_shopify',
    name: 'Shopify Storefront Connector',
    category: 'E-commerce',
    description: 'Bi-directional SKU inventory sync, order fulfillment webhooks, and centralized client ledger.',
    iconBg: 'bg-teal-700',
    status: 'Available',
    webhookStatus: 'Not Configured'
  },
  {
    id: 'comm_sendgrid',
    name: 'SendGrid Email API',
    category: 'Communications',
    description: 'Transactional email infrastructure for DGI XML fiscal invoices and billing receipts.',
    iconBg: 'bg-blue-500',
    status: 'Connected',
    apiUrl: 'https://api.sendgrid.com/v3/mail/send',
    webhookStatus: 'Active (200 OK)',
    lastPing: '6 mins ago (Latency: 74ms)'
  }
];

export default function SettingsIntegrationsPage() {
  const { addToast } = useToast();
  const [integrations, setIntegrations] = useState<IntegrationApp[]>(initialIntegrations);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Config Modal
  const [editingApp, setEditingApp] = useState<IntegrationApp | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('pk_live_sec_9918237190823901');
  const [webhookUrlInput, setWebhookUrlInput] = useState('https://api.kiaan.pa/webhooks/v1/receiver');
  const [isPinging, setIsPinging] = useState(false);

  const filteredApps = integrations.filter(app => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenConfig = (app: IntegrationApp) => {
    setEditingApp(app);
    if (app.apiUrl) {
      setWebhookUrlInput(`${app.apiUrl}/webhook`);
    } else {
      setWebhookUrlInput('https://api.kiaan.pa/webhooks/v1/receiver');
    }
  };

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      addToast(`Handshake successful! Response: 200 OK (${Math.floor(60 + Math.random() * 80)}ms)`, 'success');
    }, 900);
  };

  const handleToggleConnection = () => {
    if (!editingApp) return;

    const nextStatus = editingApp.status === 'Connected' ? 'Available' : 'Connected';

    setIntegrations(prev => prev.map(a => {
      if (a.id === editingApp.id) {
        return {
          ...a,
          status: nextStatus,
          webhookStatus: nextStatus === 'Connected' ? 'Active (200 OK)' : 'Not Configured',
          lastPing: nextStatus === 'Connected' ? 'Just now (Latency: 92ms)' : undefined
        };
      }
      return a;
    }));

    addToast(
      nextStatus === 'Connected'
        ? `Successfully connected ${editingApp.name}`
        : `Disconnected integration for ${editingApp.name}`,
      'info'
    );
    setEditingApp(null);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Settings</span>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Integrations &amp; Connectors</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">API &amp; Third-Party Connectors</h1>
            <p className="text-sm text-slate-500">
              Connect external payment rails, Panama PAC fiscal servers, SMS dispatchers, and messaging webhooks.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/fiscal'}>
              <Receipt className="w-4 h-4 mr-2 text-indigo-600" /> View PAC Facturación
            </Button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {(['All', 'Fiscal PAC', 'Payment Gateway', 'Communications', 'E-commerce'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input
              placeholder="Search connectors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredApps.map(app => {
            const isConnected = app.status === 'Connected';

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl ${app.iconBg} text-white font-bold flex items-center justify-center shadow-xs`}>
                      {app.category === 'Fiscal PAC' && <Receipt className="w-6 h-6" />}
                      {app.category === 'Payment Gateway' && <CreditCard className="w-6 h-6" />}
                      {app.category === 'Communications' && <Phone className="w-6 h-6" />}
                      {app.category === 'E-commerce' && <ShoppingCart className="w-6 h-6" />}
                    </div>
                    <Badge variant={isConnected ? 'success' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{app.name}</h3>
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">{app.category}</span>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  {isConnected && (
                    <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 text-[11px] font-mono border border-slate-100">
                      <div className="flex justify-between text-slate-600">
                        <span>Webhook:</span>
                        <span className="text-emerald-700 font-semibold">{app.webhookStatus}</span>
                      </div>
                      {app.lastPing && (
                        <div className="text-[10px] text-slate-400">
                          {app.lastPing}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {isConnected ? '✓ Automated sync active' : 'Click to configure'}
                  </span>
                  <Button
                    variant={isConnected ? 'outline' : 'primary'}
                    size="sm"
                    className="text-xs"
                    onClick={() => handleOpenConfig(app)}
                  >
                    {isConnected ? 'Configure' : 'Connect Rail'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connector Configuration Modal */}
        <Modal
          isOpen={!!editingApp}
          onClose={() => setEditingApp(null)}
          title={`Configure Connector: ${editingApp?.name}`}
        >
          {editingApp && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-800">{editingApp.name}</div>
                <div className="text-slate-500 text-[11px]">{editingApp.description}</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Live Secret API Key</label>
                <Input
                  value={apiKeyInput}
                  onChange={e => setApiKeyInput(e.target.value)}
                  type="password"
                  className="font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Webhook Receiver URL</label>
                <Input
                  value={webhookUrlInput}
                  onChange={e => setWebhookUrlInput(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
                <div>
                  <span className="font-bold text-indigo-900 block">Diagnostic Endpoint Ping</span>
                  <span className="text-[11px] text-indigo-700">Test cryptographic handshake and SSL latency</span>
                </div>
                <Button size="sm" variant="outline" onClick={handleTestPing} disabled={isPinging}>
                  <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isPinging ? 'animate-spin' : ''}`} />
                  {isPinging ? 'Pinging...' : 'Test Connection'}
                </Button>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <Button
                  variant="ghost"
                  className="text-rose-600 hover:text-rose-700"
                  onClick={handleToggleConnection}
                >
                  {editingApp.status === 'Connected' ? 'Disconnect Connector' : 'Cancel'}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditingApp(null)}>
                    Close
                  </Button>
                  {editingApp.status !== 'Connected' && (
                    <Button onClick={handleToggleConnection}>
                      Save &amp; Activate
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppShell>
  );
}
