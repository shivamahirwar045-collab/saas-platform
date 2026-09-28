'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useSaaS } from '../../context/SaaSContext';
import { SupportTicket } from '../../types/saas';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import {
  HelpCircle,
  Plus,
  Search,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronDown,
  X
} from '../../components/icons';

export default function SupportCenterPage() {
  const { supportTickets, createSupportTicket, currentBusiness } = useSaaS();
  const [activeTab, setActiveTab] = useState<'tickets' | 'faq' | 'contact'>('tickets');
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'Fiscal PAC' as const,
    priority: 'High' as const,
    description: ''
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Panama DGI PAC Electronic Invoicing work within the SaaS?',
      a: 'When an order is completed via POS or online checkout, our background PAC adapter sends signed fiscal XML payloads to your authorized PAC (The Factory HKA, Digifact, etc.). The PAC stamps the document with a unique CUFE (Código Único de Factura Electrónica) and returns the QR code verification link in under 200ms.'
    },
    {
      q: 'Can multiple branches deduct from a central logistics warehouse in Colon Free Zone?',
      a: 'Yes! The inventory system supports multi-depot hierarchies. You can execute internal stock transfers with full audit trails while tracking separate sales at retail storefronts like Calle 50 and Multiplaza.'
    },
    {
      q: 'How does the Dynamic QR in-store attendance prevent employee screenshot sharing?',
      a: 'The in-store attendance kiosk regenerates a cryptographically salted token every 15 seconds with a validity countdown timer. When staff scan the QR code with their mobile device, the server checks the timestamp and device GPS geofence against the branch coordinates.'
    },
    {
      q: 'How do I connect a custom domain like store.mybusiness.com?',
      a: 'Navigate to Website Builder → Custom Domains, input your domain name, and configure your DNS CNAME record pointing to edge.kiaan-saas.com. Automatic SSL certificates are provisioned within minutes.'
    }
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.subject) return;

    createSupportTicket({
      subject: ticketForm.subject,
      category: ticketForm.category,
      priority: ticketForm.priority,
      description: ticketForm.description
    });

    setIsNewTicketOpen(false);
  };

  const ticketColumns: Column<SupportTicket>[] = [
    {
      header: 'Ticket #',
      cell: (t) => (
        <div>
          <span className="font-bold text-slate-900">{t.ticketNumber}</span>
          <p className="text-[10px] text-slate-400">{t.createdAt}</p>
        </div>
      )
    },
    {
      header: 'Subject & Inquiry',
      cell: (t) => (
        <div>
          <p className="font-bold text-slate-800">{t.subject}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{t.lastReply}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    {
      header: 'Priority',
      cell: (t) => (
        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
            t.priority === 'High'
              ? 'bg-rose-50 text-rose-700'
              : t.priority === 'Medium'
              ? 'bg-amber-50 text-amber-700'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {t.priority}
        </span>
      )
    },
    {
      header: 'Status',
      cell: (t) => (
        <Badge
          variant={
            t.status === 'Resolved'
              ? 'success'
              : t.status === 'In Progress'
              ? 'info'
              : 'warning'
          }
        >
          {t.status}
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
              Support Center &amp; Help Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Technical ticket tracking, Panama PAC compliance guides, and dedicated enterprise concierge support.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsNewTicketOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Ticket</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Open Tickets"
            value={supportTickets.filter(t => t.status !== 'Resolved').length}
            subtitle="Under active triage"
            icon={<HelpCircle className="w-5 h-5" />}
          />
          <StatCard
            title="Avg. First Response"
            value="12 Mins"
            isPositive={true}
            subtitle="Tier 2 Enterprise SLA"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Resolved This Month"
            value="18 Tickets"
            isPositive={true}
            subtitle="100% satisfaction rating"
            icon={<CheckCircle className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Dedicated Concierge"
            value="Panama Team"
            subtitle="+507 Hotline Available"
            icon={<Phone className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'tickets' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Support Tickets ({supportTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'faq' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Knowledge Base &amp; FAQs (4)
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'contact' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Phone className="w-4 h-4" /> Direct Enterprise Channels
          </button>
        </div>

        {/* TAB 1: TICKETS */}
        {activeTab === 'tickets' && (
          <DataTable
            data={supportTickets}
            columns={ticketColumns}
            searchPlaceholder="Search support tickets by subject or number..."
            title="Enterprise Service Requests"
            subtitle="Managed under guaranteed 1-hour resolution SLA"
          />
        )}

        {/* TAB 2: FAQ ACCORDION */}
        {activeTab === 'faq' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 max-w-3xl text-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Frequently Asked Implementation Questions</h3>
              <p className="text-slate-500">Platform architecture, electronic billing, and hardware connectivity.</p>
            </div>

            <div className="divide-y divide-slate-100">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-slate-800 text-xs py-1"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaqIndex === idx ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <p className="text-slate-600 mt-2 leading-relaxed text-[11px] pr-4 animate-in fade-in duration-150">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 text-center">
              <span className="text-3xl">📱</span>
              <h4 className="font-bold text-slate-900 text-sm">WhatsApp VIP Concierge</h4>
              <p className="text-xs text-slate-500">+507 6600-4499 (Instant Support)</p>
              <button
                onClick={() => alert('Opening WhatsApp VIP Chat...')}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold mt-2"
              >
                Chat on WhatsApp
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 text-center">
              <span className="text-3xl">📞</span>
              <h4 className="font-bold text-slate-900 text-sm">Panama Phone Hotline</h4>
              <p className="text-xs text-slate-500">+507 390-4400 (Mon - Sat 8AM - 7PM)</p>
              <button
                onClick={() => alert('Dialing Panama support desk...')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold mt-2"
              >
                Call Support Desk
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 text-center">
              <span className="text-3xl">📧</span>
              <h4 className="font-bold text-slate-900 text-sm">Priority Email Triage</h4>
              <p className="text-xs text-slate-500">enterprise.care@kiaan-saas.com</p>
              <button
                onClick={() => alert('Drafting email to enterprise support triage...')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold mt-2"
              >
                Send Email
              </button>
            </div>
          </div>
        )}

        {/* MODAL: SUBMIT TICKET */}
        {isNewTicketOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Submit Priority Ticket</h3>
                <button onClick={() => setIsNewTicketOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Issue Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description of the problem"
                    value={ticketForm.subject}
                    onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Category</label>
                    <select
                      value={ticketForm.category}
                      onChange={e => setTicketForm({ ...ticketForm, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    >
                      <option value="Fiscal PAC">Panama Fiscal PAC</option>
                      <option value="POS Hardware">POS Hardware</option>
                      <option value="Website">Website &amp; Custom Domain</option>
                      <option value="Billing">Billing &amp; Gateway</option>
                      <option value="General">General Inquiries</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Urgency Priority</label>
                    <select
                      value={ticketForm.priority}
                      onChange={e => setTicketForm({ ...ticketForm, priority: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    >
                      <option value="High">High (Immediate)</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Detailed Description</label>
                  <textarea
                    rows={3}
                    placeholder="Include error codes or affected transaction references..."
                    value={ticketForm.description}
                    onChange={e => setTicketForm({ ...ticketForm, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none text-slate-800"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsNewTicketOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-semibold shadow-xs"
                  >
                    Log Ticket
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
