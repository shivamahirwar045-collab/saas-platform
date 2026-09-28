'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Customer, Lead, LeadStage } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  Users,
  Plus,
  Search,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  FileText,
  CreditCard,
  X,
  ChevronRight,
  Layers
} from '@/components/icons';

export default function CRMPage() {
  const { customers, leads, updateLeadStage, addLead, addCustomer } = useSaaS();
  const [activeTab, setActiveTab] = useState<'pipeline' | 'customers' | 'activities'>('pipeline');

  // Customer Profile 360 Drawer
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // New Lead Modal
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    title: '',
    company: '',
    contactName: '',
    email: '',
    phone: '',
    value: 12000,
    priority: 'High' as const,
    notes: ''
  });

  const pipelineStages: LeadStage[] = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal',
    'Negotiation',
    'Won',
    'Lost'
  ];

  const stageColors: Record<LeadStage, string> = {
    New: 'border-slate-300 bg-slate-50',
    Contacted: 'border-blue-300 bg-blue-50/40',
    Qualified: 'border-indigo-300 bg-indigo-50/40',
    Proposal: 'border-amber-300 bg-amber-50/40',
    Negotiation: 'border-purple-300 bg-purple-50/40',
    Won: 'border-emerald-300 bg-emerald-50/40',
    Lost: 'border-rose-300 bg-rose-50/40'
  };

  const totalPipelineValue = leads
    .filter(l => l.stage !== 'Lost')
    .reduce((sum, l) => sum + l.value, 0);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.company) return;
    addLead({
      title: leadForm.title || `${leadForm.company} Account Refit`,
      company: leadForm.company,
      contactName: leadForm.contactName || 'Representative',
      email: leadForm.email,
      phone: leadForm.phone,
      value: Number(leadForm.value),
      stage: 'New',
      priority: leadForm.priority,
      assignedTo: 'Alexander Sterling',
      probability: 20,
      nextFollowUp: 'Tomorrow, 9:00 AM',
      notes: leadForm.notes || 'Created via CRM Pipeline'
    });
    setIsAddLeadOpen(false);
  };

  // Customer Table Columns
  const customerColumns: Column<Customer>[] = [
    {
      header: 'Customer',
      cell: (c) => (
        <div>
          <p className="font-bold text-slate-900">{c.name}</p>
          <p className="text-[11px] text-slate-400">{c.company || 'Individual'}</p>
        </div>
      )
    },
    {
      header: 'Contact Info',
      cell: (c) => (
        <div>
          <p className="text-slate-700">{c.email}</p>
          <p className="text-[11px] text-slate-400">{c.phone}</p>
        </div>
      )
    },
    {
      header: 'Location',
      accessorKey: 'city'
    },
    {
      header: 'Total Purchases',
      cell: (c) => (
        <div>
          <p className="font-bold text-slate-900">${c.totalSpent.toFixed(2)}</p>
          <p className="text-[10px] text-slate-400">{c.ordersCount} orders</p>
        </div>
      )
    },
    {
      header: 'Tags',
      cell: (c) => (
        <div className="flex gap-1 flex-wrap">
          {c.tags.map(t => (
            <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
              {t}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Status',
      cell: (c) => (
        <Badge variant={c.status === 'vip' ? 'purple' : c.status === 'active' ? 'success' : 'default'}>
          {c.status.toUpperCase()}
        </Badge>
      )
    },
    {
      header: 'Action',
      cell: (c) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCustomer(c);
          }}
          className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
        >
          360° Profile
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
              CRM &amp; Sales Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Centralized 360° customer relationship history, deal stages, and AI follow-up suggestions.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Lead</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Active Pipeline"
            value={`$${(totalPipelineValue / 1000).toFixed(1)}k`}
            change="22.5%"
            isPositive={true}
            subtitle="Weighted by stage probability"
            icon={<FileText className="w-5 h-5" />}
          />
          <StatCard
            title="Active CRM Accounts"
            value={customers.length}
            subtitle="Commercial &amp; individual buyers"
            icon={<Users className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Win Conversion Rate"
            value="38.5%"
            change="4.2%"
            isPositive={true}
            subtitle="Closed deal velocity"
            icon={<CheckCircle className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Average Deal Size"
            value="$27,900"
            subtitle="Corporate tech refreshes"
            icon={<CreditCard className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'pipeline' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> Kanban Pipeline ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'customers' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" /> Customer Accounts ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'activities' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" /> Activity History &amp; Tasks (8)
          </button>
        </div>

        {/* TAB 1: KANBAN PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            {/* AI Assistant Banner */}
            <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>AI CRM Recommendation:</strong> Banco Continental ($65,000) negotiation has been open for 18 days. High probability close if Q4 maintenance bundle is included.
                </span>
              </div>
              <button
                onClick={() => alert('AI drafted follow-up contract addendum!')}
                className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg shrink-0 shadow-xs ml-2"
              >
                Draft Follow-Up
              </button>
            </div>

            {/* Kanban Columns Overflow Board */}
            <div className="flex gap-4 overflow-x-auto pb-4 items-start min-h-[500px]">
              {pipelineStages.map(stage => {
                const stageLeads = leads.filter(l => l.stage === stage);
                const stageTotal = stageLeads.reduce((s, l) => s + l.value, 0);

                return (
                  <div
                    key={stage}
                    className="w-72 shrink-0 bg-slate-100/80 rounded-2xl p-3 border border-slate-200 flex flex-col max-h-[75vh]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{stage}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">
                          ${(stageTotal / 1000).toFixed(1)}k • {stageLeads.length} deals
                        </p>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[10px] font-bold flex items-center justify-center border border-slate-200">
                        {stageLeads.length}
                      </span>
                    </div>

                    {/* Cards Container */}
                    <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                      {stageLeads.map(lead => (
                        <div
                          key={lead.id}
                          className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-2"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 truncate">
                              {lead.company}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                lead.priority === 'High'
                                  ? 'bg-rose-50 text-rose-700'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {lead.priority}
                            </span>
                          </div>

                          <h5 className="text-xs font-bold text-slate-800 leading-tight">
                            {lead.title}
                          </h5>

                          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                            <span className="font-extrabold text-slate-900">
                              ${lead.value.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {lead.probability}% Prob
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                            <span className="truncate">👤 {lead.assignedTo.split(' ')[0]}</span>
                            <span className="text-blue-600 font-medium truncate">{lead.nextFollowUp}</span>
                          </div>

                          {/* Quick Stage Mover */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">Move:</span>
                            <select
                              value={lead.stage}
                              onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
                              className="text-[10px] bg-slate-50 border border-slate-200 rounded p-1 text-slate-700 font-medium outline-none"
                            >
                              {pipelineStages.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMERS TABLE */}
        {activeTab === 'customers' && (
          <DataTable
            data={customers}
            columns={customerColumns}
            searchPlaceholder="Search customer by name, email or company..."
            title="Registered Client Directory"
            subtitle="Click on any contact to open full 360° relationship timeline"
            onRowClick={(cust) => setSelectedCustomer(cust)}
          />
        )}

        {/* TAB 3: ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Recent CRM Interactions &amp; Touchpoints</h3>
            <div className="space-y-3">
              {[
                { time: 'Today 10:15 AM', user: 'Alexander Sterling', note: 'Sent revised quotation with 3-year warranty add-on to Banco Continental.', icon: '📧' },
                { time: 'Today 09:30 AM', user: 'Carlos Santillan', note: 'Phone call with Mariana De La Guardia. Followed up on Multiplaza mall store equipment.', icon: '📞' },
                { time: 'Yesterday 16:20', user: 'Elena Rostova', note: 'Constructora del Istmo approved 50% down-payment via Panama PAC electronic invoice.', icon: '🧾' },
                { time: 'Sep 26, 2026', user: 'AI Copilot Bot', note: 'Automated WhatsApp reminder sent to Dra. Gabriela Vasquez regarding medical clinic order.', icon: '🤖' }
              ].map((act, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                  <span className="text-lg">{act.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{act.user}</span>
                      <span className="text-[10px] text-slate-400">{act.time}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{act.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOMER 360° DRAWER */}
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex justify-end">
            <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200 overflow-y-auto">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedCustomer.name}</h3>
                    <p className="text-xs text-slate-400">{selectedCustomer.company} • Member since {selectedCustomer.createdAt}</p>
                  </div>
                  <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* AI Relationship Summary */}
                <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> AI Customer Dossier
                  </div>
                  <p className="text-blue-900 leading-relaxed">
                    High lifetime value VIP client. Prefers official Panama PAC invoices billed directly to RUC. High likelihood of expanding office tech in Q4.
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400">Total Revenue Generated</span>
                    <p className="text-base font-bold text-slate-900 mt-1">${selectedCustomer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400">Total Invoices &amp; Orders</span>
                    <p className="text-base font-bold text-slate-900 mt-1">{selectedCustomer.ordersCount} Completed</p>
                  </div>
                </div>

                {/* Contact Data */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-800">Contact Details</span>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-600">
                    <p>📧 {selectedCustomer.email}</p>
                    <p>📞 {selectedCustomer.phone}</p>
                    <p>📍 {selectedCustomer.city}, {selectedCustomer.country}</p>
                    <p>👤 Account Manager: {selectedCustomer.assignedTo}</p>
                  </div>
                </div>

                {/* Notes & Tasks */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-800">Account Notes ({selectedCustomer.notesCount})</span>
                  <textarea
                    rows={3}
                    defaultValue="Prefers morning delivery to Costa del Este. Check unboxing on laptops."
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none text-slate-700"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => alert(`Logged simulated call to ${selectedCustomer.phone}`)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
                >
                  Log Phone Call
                </button>
                <button
                  onClick={() => alert(`Opening email composer for ${selectedCustomer.email}`)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  Send Email / Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CREATE LEAD */}
        {isAddLeadOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Add New Pipeline Lead</h3>
                <button onClick={() => setIsAddLeadOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Banco Aliado Panama"
                    value={leadForm.company}
                    onChange={e => setLeadForm({ ...leadForm, company: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Lead Opportunity Title</label>
                    <input
                      type="text"
                      placeholder="e.g. 20-Terminal POS Fleet"
                      value={leadForm.title}
                      onChange={e => setLeadForm({ ...leadForm, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Estimated Value ($)</label>
                    <input
                      type="number"
                      value={leadForm.value}
                      onChange={e => setLeadForm({ ...leadForm, value: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Contact Person</label>
                    <input
                      type="text"
                      placeholder="e.g. Gabriel Arosemena"
                      value={leadForm.contactName}
                      onChange={e => setLeadForm({ ...leadForm, contactName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Priority</label>
                    <select
                      value={leadForm.priority}
                      onChange={e => setLeadForm({ ...leadForm, priority: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-semibold shadow-xs"
                  >
                    Insert to Pipeline
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
