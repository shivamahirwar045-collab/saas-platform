'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { mockWebsitePages, mockWebsiteTemplates } from '@/data/mockData';
import { PageSection, SectionType } from '@/types/saas';
import {
  Globe,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Check,
  RefreshCw,
  Sliders,
  Layers,
  Search,
  Monitor,
  CheckCircle,
  ArrowRight
} from '@/components/icons';

export default function WebsiteBuilderPage() {
  const { currentBusiness } = useSaaS();
  const [activeTab, setActiveTab] = useState<'builder' | 'pages' | 'templates' | 'seo' | 'domains'>('builder');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Active page & sections
  const [pages, setPages] = useState(mockWebsitePages);
  const [selectedPageId, setSelectedPageId] = useState(mockWebsitePages[0].id);
  const [sections, setSections] = useState<PageSection[]>(mockWebsitePages[0].sections);

  // AI Prompt Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('Create a modern high-conversion B2B section highlighting our nationwide Panama electronics delivery and official warranties.');
  const [isGenerating, setIsGenerating] = useState(false);

  // Section Add Modal
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);

  const sectionTypes: SectionType[] = [
    'Hero', 'About', 'Services', 'Products', 'Gallery', 'Video',
    'Testimonials', 'FAQs', 'Contact', 'Map', 'CTA', 'Features', 'Pricing', 'Footer'
  ];

  // Reorder / Delete / Duplicate
  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const handleDuplicateSection = (sec: PageSection) => {
    const newSec: PageSection = {
      ...sec,
      id: `sec_${Date.now()}`,
      title: `${sec.title} (Copy)`,
      order: sections.length + 1
    };
    setSections([...sections, newSec]);
  };

  const handleAddSection = (type: SectionType) => {
    const newSec: PageSection = {
      id: `sec_${Date.now()}`,
      type,
      title: `${type} Section Title`,
      content: `Customize your ${type.toLowerCase()} content here with enterprise typography and branding.`,
      isVisible: true,
      order: sections.length + 1,
      buttonText: type === 'Hero' || type === 'CTA' ? 'Learn More' : undefined,
      buttonUrl: '/ecommerce'
    };
    setSections([...sections, newSec]);
    setIsAddSectionOpen(false);
  };

  const handleAiGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedSec: PageSection = {
        id: `sec_${Date.now()}`,
        type: 'Features',
        title: 'Panama Enterprise Procurement Standard',
        content: `Crafted from prompt "${aiPrompt}". Authorized DGI PAC e-invoicing, same-day Colon logistics routing, and dedicated corporate account managers.`,
        isVisible: true,
        order: sections.length + 1,
        buttonText: 'Request Corporate Quote',
        buttonUrl: '/crm'
      };
      setSections([...sections, generatedSec]);
      setIsGenerating(false);
      setIsAiModalOpen(false);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Website + AI Page Builder
              </h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                Published &amp; Live
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Visual drag-and-drop page builder with reusable components, responsive device previews, and AI generative design.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Section Generator</span>
            </button>
            <button
              onClick={() => alert('Changes published to edge CDN!')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              Publish Updates
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('builder')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'builder' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> Visual Page Builder
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'pages' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" /> Pages ({pages.length})
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'templates' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Templates ({mockWebsiteTemplates.length})
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'seo' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" /> SEO &amp; Metadata
          </button>
          <button
            onClick={() => setActiveTab('domains')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'domains' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Monitor className="w-4 h-4" /> Custom Domains &amp; SSL
          </button>
        </div>

        {/* TAB 1: VISUAL PAGE BUILDER */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar: Sections List & Controls */}
            <div className="lg:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Page Canvas</h3>
                  <p className="text-[11px] text-slate-500">Editing: Home (/) </p>
                </div>
                <button
                  onClick={() => setIsAddSectionOpen(true)}
                  className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold"
                  title="Add Section"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Sections Ordered List */}
              <div className="space-y-2">
                {sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded bg-white text-slate-500 border border-slate-200 flex items-center justify-center font-mono text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <p className="font-semibold text-slate-800 truncate">{sec.title}</p>
                        <p className="text-[10px] text-blue-600 font-medium">{sec.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDuplicateSection(sec)}
                        title="Duplicate"
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSection(sec.id)}
                        title="Delete"
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsAddSectionOpen(true)}
                className="w-full py-2 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl text-xs font-semibold text-slate-500 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Section
              </button>
            </div>

            {/* Main Area: Responsive Visual Preview */}
            <div className="lg:col-span-3 space-y-4">
              {/* Device Toolbar */}
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      previewDevice === 'desktop' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Desktop (100%)
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      previewDevice === 'tablet' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Tablet (768px)
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      previewDevice === 'mobile' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Mobile (375px)
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="hidden sm:inline">Live Preview Mode</span>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="flex justify-center bg-slate-100 p-4 sm:p-6 rounded-2xl border border-slate-200/80 min-h-[600px] overflow-x-auto">
                <div
                  className={`bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 ${
                    previewDevice === 'desktop'
                      ? 'w-full max-w-4xl'
                      : previewDevice === 'tablet'
                      ? 'w-[768px]'
                      : 'w-[375px]'
                  }`}
                >
                  {/* Top Store Header */}
                  <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold tracking-tight">
                      <span className="text-lg">{currentBusiness.logo}</span>
                      <span>{currentBusiness.name}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-slate-300">
                      <span>Products</span>
                      <span>B2B Procurement</span>
                      <span>Branches</span>
                      <span>Panama PAC</span>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-600 rounded-lg text-white font-semibold">
                      Shop Now
                    </button>
                  </div>

                  {/* Rendered Sections Canvas */}
                  <div className="divide-y divide-slate-100">
                    {sections.map(sec => (
                      <div key={sec.id} className="p-8 sm:p-10 relative group hover:ring-2 hover:ring-blue-500/50 transition-all">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
                          {sec.type} Section
                        </div>

                        {sec.type === 'Hero' && (
                          <div className="text-center max-w-xl mx-auto space-y-4">
                            <span className="text-xs uppercase font-bold text-blue-600 tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                              Enterprise Hardware &amp; Ergonomics
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                              {sec.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {sec.content}
                            </p>
                            {sec.buttonText && (
                              <div className="pt-2">
                                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20">
                                  {sec.buttonText}
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {sec.type === 'Features' && (
                          <div className="space-y-6">
                            <div className="text-center max-w-md mx-auto">
                              <h3 className="text-xl font-bold text-slate-900">{sec.title}</h3>
                              <p className="text-xs text-slate-500 mt-1">{sec.content}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-1">
                                <span className="text-2xl">⚡</span>
                                <h4 className="font-bold text-slate-900">Direct PAC Billing</h4>
                                <p className="text-slate-500 text-[11px]">Instant DGI Panama electronic invoices</p>
                              </div>
                              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-1">
                                <span className="text-2xl">🚚</span>
                                <h4 className="font-bold text-slate-900">Express Delivery</h4>
                                <p className="text-slate-500 text-[11px]">Same-day logistics across Panama City</p>
                              </div>
                              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-1">
                                <span className="text-2xl">🛡️</span>
                                <h4 className="font-bold text-slate-900">Official Warranties</h4>
                                <p className="text-slate-500 text-[11px]">Authorized enterprise support</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {sec.type !== 'Hero' && sec.type !== 'Features' && (
                          <div className="p-6 bg-slate-50/70 rounded-xl border border-dashed border-slate-300 text-center">
                            <h3 className="text-base font-bold text-slate-800">{sec.title}</h3>
                            <p className="text-xs text-slate-500 mt-1">{sec.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Simulated Footer */}
                  <div className="bg-slate-950 text-slate-400 p-6 text-xs text-center border-t border-slate-800">
                    <p>© 2026 {currentBusiness.name}. Powered by KIAAN SaaS Operating System.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAGES */}
        {activeTab === 'pages' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Configured Website Pages</h3>
                <p className="text-xs text-slate-500">Manage route paths, SEO titles, and publication states</p>
              </div>
              <button
                onClick={() => {
                  const newTitle = prompt('Enter new page title:');
                  if (newTitle) {
                    setPages([
                      ...pages,
                      {
                        id: `pg_${Date.now()}`,
                        title: newTitle,
                        slug: `/${newTitle.toLowerCase().replace(/\s+/g, '-')}`,
                        status: 'draft',
                        sections: [],
                        seoTitle: newTitle,
                        seoDescription: `Discover ${newTitle} at ${currentBusiness.name}`,
                        updatedAt: new Date().toISOString().split('T')[0]
                      }
                    ]);
                  }
                }}
                className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold"
              >
                + New Page
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {pages.map(p => (
                <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{p.title}</span>
                      <span className="font-mono text-[10px] text-slate-400">{p.slug}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{p.seoDescription}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {p.status}
                    </span>
                    <button
                      onClick={() => setActiveTab('builder')}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Open in Builder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockWebsiteTemplates.map(tmpl => (
              <div
                key={tmpl.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tmpl.previewUrl} alt={tmpl.name} className="w-full h-36 object-cover" />
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {tmpl.industry}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{tmpl.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{tmpl.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Template "${tmpl.name}" applied to current page!`);
                      setActiveTab('builder');
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl text-xs font-semibold transition-colors mt-3"
                  >
                    Apply Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SEO */}
        {activeTab === 'seo' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Global Search Engine Optimization (SEO)</h3>
            <p className="text-slate-500">Configure indexing, OpenGraph social previews, and automated XML sitemaps.</p>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Global Meta Title</label>
              <input
                type="text"
                defaultValue={`${currentBusiness.name} | Premium Lifestyle, Tech & B2B Solutions Panama`}
                className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Global Meta Description</label>
              <textarea
                rows={3}
                defaultValue="Discover enterprise hardware, ANC audio, ergonomic furniture and omnichannel POS solutions with direct Panama DGI PAC fiscal invoicing."
                className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">XML Sitemap Status</span>
                <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Auto-generated (/sitemap.xml)</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Robots.txt</span>
                <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Indexing Permitted</p>
              </div>
            </div>

            <button
              onClick={() => alert('SEO settings saved!')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold"
            >
              Save SEO Configuration
            </button>
          </div>
        )}

        {/* TAB 5: DOMAINS */}
        {activeTab === 'domains' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl space-y-5 text-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Custom Domain &amp; Edge SSL</h3>
              <p className="text-slate-500">Map your own custom business domain with automated Let&apos;s Encrypt wildcard SSL.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Primary Connected Domain</span>
                  <p className="font-mono text-sm font-bold text-slate-900">store.acmeretail.com</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded text-[11px]">
                  ✓ Connected &amp; Secure
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 text-[11px] pt-2 border-t border-slate-200">
                <span>SSL Certificate: Cloudflare Edge 256-bit</span>
                <span>DNS TTL: 300s</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-700 font-semibold">Connect New Domain</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. www.mycompany.com"
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => alert('CNAME record generated: pointing to edge.kiaan-saas.com')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold"
                >
                  Verify CNAME
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: AI Section Generator */}
        {isAiModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">AI Section &amp; Copy Generator</h3>
              </div>
              <p className="text-xs text-slate-500">
                Describe the section or offer you need. AI will generate layout, typography hierarchy, and enterprise copy.
              </p>

              <textarea
                rows={4}
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAiGenerate}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating Section...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> Generate &amp; Append
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Section Library */}
        {isAddSectionOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Select Section Type to Insert</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {sectionTypes.map(st => (
                  <button
                    key={st}
                    onClick={() => handleAddSection(st)}
                    className="p-3 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors text-left"
                  >
                    + {st}
                  </button>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsAddSectionOpen(false)}
                  className="px-4 py-1.5 text-xs text-slate-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
