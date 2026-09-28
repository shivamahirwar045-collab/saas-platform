'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Lead, LeadStage } from '@/types/saas';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Building2,
  Calendar
} from '@/components/icons';

export default function CrmLeadsPage() {
  const { leads, addLead, updateLeadStage, currentBusiness } = useSaaS();
  const { success, info } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Lead form
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('15000');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'All' || l.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalPipelineVal = leads.reduce((sum, l) => sum + l.value, 0);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newL: Lead = {
      id: `lead_${Date.now()}`,
      businessId: currentBusiness.id,
      title,
      company,
      contactName,
      email,
      phone,
      value: parseFloat(value) || 0,
      stage: 'New',
      priority,
      assignedTo: 'Sales Team',
      probability: 25,
      nextFollowUp: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      notes: 'Inbound lead captured via corporate inquiry form.',
      createdAt: new Date().toISOString()
    };
    addLead(newL);
    setIsAddOpen(false);
    setTitle('');
    setCompany('');
    setContactName('');
    setEmail('');
    setPhone('');
    success('Lead Created', `Deal "${newL.title}" added to active sales pipeline.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sales Leads & Opportunities</h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                ${totalPipelineVal.toLocaleString()} Pipeline Value
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Capture inbound wholesale prospects, manage deal valuations, and schedule discovery meetings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/crm/pipeline">
              <Button variant="outline" size="sm">
                Kanban View
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddOpen(true)}
            >
              New Lead
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/crm" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/crm/customers" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Customers 360
          </Link>
          <Link href="/crm/leads" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Leads
          </Link>
          <Link href="/crm/pipeline" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Deals Pipeline
          </Link>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by title, company or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['All', 'New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won'].map((st) => (
              <button
                key={st}
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  stageFilter === st
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Opportunity & Company</th>
                  <th className="py-3.5 px-4">Contact Person</th>
                  <th className="py-3.5 px-4">Deal Value</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4 text-right">Quick Advance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.map((lead) => {
                  const stagesOrder: LeadStage[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
                  const currentIndex = stagesOrder.indexOf(lead.stage);
                  const nextStage = currentIndex >= 0 && currentIndex < stagesOrder.length - 1 ? stagesOrder[currentIndex + 1] : null;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div>
                          <p className="font-bold text-slate-900 text-sm leading-snug">
                            {lead.title}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-semibold text-slate-700">{lead.company}</span>
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-900">{lead.contactName}</p>
                        <p className="text-[11px] text-slate-400">{lead.email}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 font-mono text-sm">
                          ${lead.value.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            lead.stage === 'Won'
                              ? 'success'
                              : lead.stage === 'Negotiation' || lead.stage === 'Proposal'
                              ? 'info'
                              : 'default'
                          }
                        >
                          {lead.stage}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded font-mono ${
                            lead.priority === 'High'
                              ? 'bg-rose-100 text-rose-700'
                              : lead.priority === 'Medium'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {lead.priority} Priority
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {nextStage && (
                          <button
                            onClick={() => {
                              updateLeadStage(lead.id, nextStage);
                              success('Stage Advanced', `Moved "${lead.title}" to ${nextStage}`);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                          >
                            <span>Move to {nextStage}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Lead Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Sales Opportunity"
        description="Register an inbound prospect or enterprise project in the sales pipeline."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateLead}>
              Create Lead
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
          <Input
            label="Deal Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 50x UltraBook Fleet Renewal"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Company Name"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Banco General Panama"
            />
            <Input
              label="Primary Contact Name"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Carlos Mendoza"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="carlos.m@bancogeneral.pa"
            />
            <Input
              label="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+507 6844-9900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Estimated Value ($ USD)"
              type="number"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Select
              label="Priority Level"
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              options={[
                { value: 'High', label: 'High Priority (Closing Soon)' },
                { value: 'Medium', label: 'Medium Priority' },
                { value: 'Low', label: 'Low Priority / Backlog' }
              ]}
            />
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
