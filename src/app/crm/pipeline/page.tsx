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
  Plus,
  ArrowRight,
  ChevronLeft,
  Building2,
  Calendar,
  Sparkles,
  CreditCard
} from '@/components/icons';

export default function CrmPipelinePage() {
  const { leads, updateLeadStage, addLead, currentBusiness } = useSaaS();
  const { success } = useToast();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Deal State
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [value, setValue] = useState('25000');
  const [targetStage, setTargetStage] = useState<LeadStage>('New');

  const pipelineStages: LeadStage[] = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal',
    'Negotiation',
    'Won',
    'Lost'
  ];

  const stageBorderColors: Record<LeadStage, string> = {
    New: 'border-slate-300',
    Contacted: 'border-blue-400',
    Qualified: 'border-cyan-400',
    Proposal: 'border-amber-400',
    Negotiation: 'border-purple-400',
    Won: 'border-emerald-500',
    Lost: 'border-rose-400'
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const newL: Lead = {
      id: `deal_${Date.now()}`,
      businessId: currentBusiness.id,
      title,
      company,
      contactName,
      email: `${contactName.toLowerCase().replace(/\s+/g, '.')}@example.pa`,
      phone: '+507 6000-0000',
      value: parseFloat(value) || 0,
      stage: targetStage,
      priority: 'High',
      assignedTo: 'Account Exec',
      probability: 50,
      nextFollowUp: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      notes: 'Corporate procurement agreement.',
      createdAt: new Date().toISOString()
    };
    addLead(newL);
    setIsAddOpen(false);
    setTitle('');
    setCompany('');
    setContactName('');
    success('Deal Added to Pipeline', `"${newL.title}" created in ${targetStage}.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Kanban Deals Pipeline</h1>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200">
                7 Stages Live
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Visual deal progression, probability weighting, and corporate B2B sales acceleration.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/crm/leads">
              <Button variant="outline" size="sm">
                Table List View
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddOpen(true)}
            >
              Add Deal
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
          <Link href="/crm/leads" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Leads
          </Link>
          <Link href="/crm/pipeline" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Deals Pipeline
          </Link>
        </div>

        {/* 7-Stage Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-6">
          {pipelineStages.map((stage) => {
            const stageLeads = leads.filter((l) => l.stage === stage);
            const stageTotalVal = stageLeads.reduce((sum, l) => sum + l.value, 0);

            return (
              <div
                key={stage}
                className="w-72 shrink-0 bg-slate-100/80 rounded-2xl p-3 border border-slate-200/80 flex flex-col max-h-[75vh]"
              >
                {/* Column Header */}
                <div className={`p-3 bg-white rounded-xl border-t-4 ${stageBorderColors[stage]} border-slate-200 shadow-2xs mb-3`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{stage}</h3>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {stageLeads.length}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 font-mono mt-1">
                    ${stageTotalVal.toLocaleString()}
                  </p>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 leading-snug">
                          {lead.title}
                        </h4>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono shrink-0 ${
                            lead.priority === 'High'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {lead.priority}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{lead.company}</span>
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="font-bold text-slate-900 font-mono">
                          ${lead.value.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">{lead.contactName.split(' ')[0]}</span>
                      </div>

                      {/* Advance Stage Control */}
                      <div className="pt-2 flex items-center justify-between gap-1 text-[10px]">
                        {stage !== 'New' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const curIdx = pipelineStages.indexOf(stage);
                              if (curIdx > 0) {
                                updateLeadStage(lead.id, pipelineStages[curIdx - 1]);
                              }
                            }}
                            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            ← Back
                          </button>
                        )}
                        {stage !== 'Won' && stage !== 'Lost' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const curIdx = pipelineStages.indexOf(stage);
                              if (curIdx < pipelineStages.length - 1) {
                                updateLeadStage(lead.id, pipelineStages[curIdx + 1]);
                              }
                            }}
                            className="ml-auto px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold transition-colors"
                          >
                            Next →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-300 rounded-xl">
                      No deals in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deal Detail Modal */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={selectedLead.title}
          description={`Opportunity for ${selectedLead.company}`}
          maxWidth="lg"
          footer={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedLead(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  updateLeadStage(selectedLead.id, 'Won');
                  setSelectedLead(null);
                  success('Deal Closed as Won!', 'Revenue added to enterprise quarterly quota.');
                }}
              >
                Mark as Deal Won (100%)
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Value:</span>
                <span className="font-bold text-slate-900 font-mono text-base">
                  ${selectedLead.value.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Stage:</span>
                <Badge variant="info">{selectedLead.stage}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Contact:</span>
                <span className="font-semibold text-slate-800">{selectedLead.contactName} ({selectedLead.email})</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Executive Notes & Strategy</h4>
              <p className="text-slate-600 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                {selectedLead.notes}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Deal Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create New Pipeline Deal"
        description="Add a deal directly to any stage of the sales pipeline."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateDeal}>
              Create Deal
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateDeal} className="space-y-4 text-xs">
          <Input
            label="Deal Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 20x Studio Audio Commercial Package"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Company Name"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Global Bank Panama"
            />
            <Input
              label="Contact Person"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Andrea Solis"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Deal Value ($ USD)"
              type="number"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Select
              label="Initial Stage"
              value={targetStage}
              onChange={(e) => setTargetStage(e.target.value as any)}
              options={pipelineStages.map((st) => ({ value: st, label: st }))}
            />
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
