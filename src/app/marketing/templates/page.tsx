'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  Phone,
  Mail,
  Megaphone,
  Plus,
  CheckCircle,
  Copy,
  Smartphone,
  Eye,
  Edit3,
  Search,
  Filter,
  Sparkles,
  ExternalLink,
  AlertTriangle
} from '@/components/icons';

interface MessageTemplate {
  id: string;
  name: string;
  channel: 'WhatsApp' | 'Email' | 'SMS';
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  metaStatus: 'APPROVED' | 'IN_REVIEW' | 'REJECTED';
  language: string;
  headerType?: 'IMAGE' | 'TEXT' | 'DOCUMENT';
  headerContent?: string;
  body: string;
  footer?: string;
  buttons?: Array<{ type: 'URL' | 'QUICK_REPLY' | 'PHONE'; text: string }>;
  updatedAt: string;
}

const initialTemplates: MessageTemplate[] = [
  {
    id: 'tpl-wa-001',
    name: 'order_delivery_confirmation_v2',
    channel: 'WhatsApp',
    category: 'UTILITY',
    metaStatus: 'APPROVED',
    language: 'es_PA (Spanish Panama)',
    headerType: 'TEXT',
    headerContent: '📦 Pedido en Camino — KIAAN Express',
    body: 'Hola {{1}}, su pedido {{2}} ha salido de nuestro centro de distribución en Albrook. Conductor asignado: {{3}}.\n\nPuede rastrear el motorizado en tiempo real o coordinar con la garita aquí.',
    footer: 'KIAAN All-in-One SaaS • RUC 1557129-1-857211',
    buttons: [
      { type: 'URL', text: '📍 Ver Ruta en Vivo' },
      { type: 'PHONE', text: '📞 Llamar a Motorizado' }
    ],
    updatedAt: '2026-09-22'
  },
  {
    id: 'tpl-wa-002',
    name: 'panama_fiscal_invoice_delivery',
    channel: 'WhatsApp',
    category: 'UTILITY',
    metaStatus: 'APPROVED',
    language: 'es_PA (Spanish Panama)',
    headerType: 'DOCUMENT',
    headerContent: 'Factura_Fiscal_DGI.pdf',
    body: 'Estimado cliente {{1}}, adjuntamos su Factura Electrónica Fiscal correspondiente a la transacción {{2}} por un monto de {{3}} con CUFE oficial validado ante la DGI Panamá.',
    footer: 'Validado por Digifact PAC Panamá',
    buttons: [
      { type: 'URL', text: '📄 Descargar XML DGI' },
      { type: 'QUICK_REPLY', text: '💬 Hablar con Soporte' }
    ],
    updatedAt: '2026-09-25'
  },
  {
    id: 'tpl-wa-003',
    name: 'vip_season_discount_exclusive',
    channel: 'WhatsApp',
    category: 'MARKETING',
    metaStatus: 'APPROVED',
    language: 'es_PA (Spanish Panama)',
    headerType: 'IMAGE',
    headerContent: 'Banner_Promo_Multiplaza.jpg',
    body: '🎉 ¡Hola {{1}}! Como miembro distinguido de nuestro club VIP, le obsequiamos un {{2}}% de descuento en toda la línea de accesorios empresariales. Válido hasta {{3}} presentando este mensaje en caja.',
    footer: 'Para desuscribirse responda STOP',
    buttons: [
      { type: 'URL', text: '🛒 Ver Catálogo VIP' }
    ],
    updatedAt: '2026-09-27'
  },
  {
    id: 'tpl-wa-004',
    name: 'pos_cashier_mfa_token',
    channel: 'WhatsApp',
    category: 'AUTHENTICATION',
    metaStatus: 'APPROVED',
    language: 'es_PA (Spanish Panama)',
    body: '{{1}} es su código de autorización de un solo uso (OTP) para apertura de caja y anulación de factura en KIAAN POS. No comparta este token con nadie.',
    footer: 'Expira en 10 minutos',
    buttons: [
      { type: 'QUICK_REPLY', text: 'Copiar Código' }
    ],
    updatedAt: '2026-09-15'
  },
  {
    id: 'tpl-em-001',
    name: 'b2b_corporate_quote_followup',
    channel: 'Email',
    category: 'UTILITY',
    metaStatus: 'APPROVED',
    language: 'es (Spanish)',
    headerType: 'TEXT',
    headerContent: 'Propuesta Comercial Formal - KIAAN Enterprise',
    body: 'Estimado(a) {{1}},\n\nFue un placer conversar sobre el equipamiento de su sede comercial. Hemos preparado la cotización detallada con desglose de ITBMS y plan de mantenimiento extendido.\n\nQuedamos a su disposición para agendar una sesión técnica o formalizar la orden de compra.',
    footer: 'KIAAN Enterprise Panamá • ventas@kiaan.pa',
    updatedAt: '2026-09-20'
  }
];

export default function MarketingTemplatesPage() {
  const { addToast } = useToast();
  const [templates, setTemplates] = useState<MessageTemplate[]>(initialTemplates);
  const [activeChannel, setActiveChannel] = useState<'All' | 'WhatsApp' | 'Email' | 'SMS'>('All');
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate>(initialTemplates[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // New Template Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newChannel, setNewChannel] = useState<'WhatsApp' | 'Email' | 'SMS'>('WhatsApp');
  const [newCategory, setNewCategory] = useState<'MARKETING' | 'UTILITY' | 'AUTHENTICATION'>('MARKETING');
  const [newBody, setNewBody] = useState('');
  const [newHeader, setNewHeader] = useState('');

  const filteredTemplates = templates.filter(t => {
    const matchesChannel = activeChannel === 'All' || t.channel === activeChannel;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const handleCopyBody = (text: string) => {
    navigator.clipboard?.writeText(text);
    addToast('Template body copied to clipboard', 'info');
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBody) return;

    const formattedName = newName.toLowerCase().replace(/\s+/g, '_');
    const created: MessageTemplate = {
      id: `tpl-${Date.now().toString().slice(-4)}`,
      name: formattedName,
      channel: newChannel,
      category: newCategory,
      metaStatus: newChannel === 'WhatsApp' ? 'IN_REVIEW' : 'APPROVED',
      language: 'es_PA (Spanish Panama)',
      headerType: newHeader ? 'TEXT' : undefined,
      headerContent: newHeader || undefined,
      body: newBody,
      footer: 'KIAAN Business OS • Desuscribirse enviando STOP',
      buttons: [{ type: 'URL', text: '🌐 Visitar Portal' }],
      updatedAt: '2026-09-28'
    };

    setTemplates([created, ...templates]);
    setSelectedTemplate(created);
    setIsModalOpen(false);
    setNewName('');
    setNewBody('');
    setNewHeader('');

    addToast(
      newChannel === 'WhatsApp'
        ? `Template "${formattedName}" submitted to Meta for HSM review (12-24h)`
        : `Template "${formattedName}" saved and ready for campaigns`,
      'success'
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Message & HSM Template Studio</h1>
            <p className="text-sm text-slate-500">
              Manage pre-approved WhatsApp Business HSM templates, interactive buttons, and branded corporate emails.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/marketing/campaigns'}>
              Back to Campaigns
            </Button>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> New Template
            </Button>
          </div>
        </div>

        {/* Channel Pills & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {(['All', 'WhatsApp', 'Email', 'SMS'] as const).map(ch => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeChannel === ch
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input
              placeholder="Search template name or text..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
        </div>

        {/* 2-Column Split: List + Live Smartphone Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Template Catalog (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {filteredTemplates.map(tpl => {
              const isSelected = selectedTemplate.id === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-400 shadow-sm ring-1 ring-indigo-400'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-2">
                        {tpl.name}
                        {tpl.channel === 'WhatsApp' && (
                          <Badge variant={tpl.metaStatus === 'APPROVED' ? 'success' : 'warning'}>
                            {tpl.metaStatus}
                          </Badge>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-slate-700">{tpl.category}</span>
                        <span>•</span>
                        <span>{tpl.channel}</span>
                        <span>•</span>
                        <span>{tpl.language}</span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyBody(tpl.body);
                      }}
                      title="Copy message body"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    </Button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-sans">
                    {tpl.body}
                  </p>

                  {tpl.buttons && tpl.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {tpl.buttons.map((b, i) => (
                        <span key={i} className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {b.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Live Smartphone Interactive Simulator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-4 shadow-xl border-4 border-slate-800 max-w-sm mx-auto sticky top-20">
              {/* Phone Top Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>

              {/* Chat Header */}
              <div className="bg-slate-800/90 rounded-t-xl p-3 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                    K
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      KIAAN Verified Business
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="text-[10px] text-slate-400">Official WhatsApp API</div>
                  </div>
                </div>
                <Smartphone className="w-4 h-4 text-slate-400" />
              </div>

              {/* WhatsApp Wallpaper Canvas */}
              <div className="bg-slate-950/70 p-3 rounded-b-xl min-h-[360px] flex flex-col justify-end space-y-2 font-sans">
                {/* Simulated Bubble */}
                <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tl-none shadow-md max-w-[90%] space-y-2 text-xs">
                  {selectedTemplate.headerContent && (
                    <div className="font-bold text-white pb-1 border-b border-emerald-700/50">
                      {selectedTemplate.headerContent}
                    </div>
                  )}

                  <p className="whitespace-pre-wrap leading-relaxed text-[11px] text-emerald-50">
                    {selectedTemplate.body
                      .replace('{{1}}', 'Juan Pérez')
                      .replace('{{2}}', '#ORD-8821')
                      .replace('{{3}}', '$450.00')}
                  </p>

                  {selectedTemplate.footer && (
                    <div className="text-[9px] text-emerald-300/80 pt-1">
                      {selectedTemplate.footer}
                    </div>
                  )}

                  <div className="text-[9px] text-right text-emerald-300">
                    10:42 AM • ✓✓
                  </div>
                </div>

                {/* Call to Action Buttons */}
                {selectedTemplate.buttons?.map((btn, idx) => (
                  <div
                    key={idx}
                    className="bg-[#202c33] text-cyan-400 py-2 px-3 rounded-xl text-center text-xs font-semibold shadow hover:bg-[#2a3942] transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {btn.text}
                  </div>
                ))}
              </div>

              {/* Phone Footer Bar */}
              <div className="mt-3 text-center text-[10px] text-slate-400">
                Simulating verified Meta HSM client render
              </div>
            </div>
          </div>
        </div>

        {/* Create Template Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Register New HSM Message Template"
        >
          <form onSubmit={handleCreateTemplate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Template Name (snake_case)
              </label>
              <Input
                placeholder="e.g. promo_black_friday_vip"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                required
              />
              <span className="text-[10px] text-slate-400">Only lowercase alphanumeric and underscores allowed.</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Channel</label>
                <Select
                  value={newChannel}
                  onChange={e => setNewChannel(e.target.value as any)}
                  options={[
                    { value: 'WhatsApp', label: 'WhatsApp HSM (Meta)' },
                    { value: 'Email', label: 'Email Newsletter' },
                    { value: 'SMS', label: 'SMS Blast' }
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <Select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  options={[
                    { value: 'MARKETING', label: 'Marketing' },
                    { value: 'UTILITY', label: 'Utility & Transactional' },
                    { value: 'AUTHENTICATION', label: 'Authentication (OTP)' }
                  ]}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Header Title (Optional)</label>
              <Input
                placeholder="e.g. 🎁 Oferta Especial KIAAN"
                value={newHeader}
                onChange={e => setNewHeader(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Message Body</label>
              <textarea
                value={newBody}
                onChange={e => setNewBody(e.target.value)}
                placeholder="Write your template text. Use {{1}}, {{2}} for dynamic variables..."
                rows={4}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <div className="text-[11px] text-slate-400 mt-1">
                Variables like <code>{'{{1}}'}</code> will be mapped to customer names or order IDs during campaign dispatch.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Template for Approval
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
