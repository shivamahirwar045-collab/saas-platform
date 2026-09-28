'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { mockWebsiteTemplates } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { useToast } from '@/components/ui/Toast';
import {
  Globe,
  Sparkles,
  Eye,
  CheckCircle,
  ArrowRight,
  Monitor,
  ShoppingBag,
  Star
} from '@/components/icons';

export default function WebsiteTemplatesGallery() {
  const { success } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<typeof mockWebsiteTemplates[0] | null>(null);

  const categories = ['All', 'Retail & Tech', 'Fashion', 'Dining & Food', 'Services', 'Luxury'];

  const filteredTemplates = selectedCategory === 'All'
    ? mockWebsiteTemplates
    : mockWebsiteTemplates.filter((t) => t.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleApply = (tpl: typeof mockWebsiteTemplates[0]) => {
    success('Template Activated', `Applied "${tpl.name}" to your main digital storefront.`);
    setPreviewTemplate(null);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Website Template Gallery</h1>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200">
                AI Ready
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select professionally designed, conversion-tested storefront themes built with responsive Tailwind layouts.
            </p>
          </div>

          <Link href="/website">
            <Button variant="outline" size="sm">
              Open Visual Builder
            </Button>
          </Link>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/website" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Visual Editor
          </Link>
          <Link href="/website/pages" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            All Pages
          </Link>
          <Link href="/website/templates" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Templates
          </Link>
          <Link href="/website/seo" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            SEO & Social Cards
          </Link>
          <Link href="/website/domains" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Domains & SSL
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              {/* Thumbnail preview banner */}
              <div className="h-44 bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 p-5 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    {tpl.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-300 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span className="font-bold text-[11px]">4.9</span>
                  </div>
                </div>

                <div className="z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                    {tpl.description}
                  </p>
                </div>

                {/* Ambient glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Included Sections:</span>
                    <span className="font-semibold text-slate-800">Hero, Catalog, Reviews, Footer</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Performance Score:</span>
                    <span className="font-semibold text-emerald-600 font-mono">99/100 Core Web Vitals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mobile Responsive:</span>
                    <span className="font-semibold text-blue-600">Adaptive Flex Grid</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => setPreviewTemplate(tpl)}
                  >
                    Live Preview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handleApply(tpl)}
                  >
                    Apply Theme
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Preview Drawer */}
      {previewTemplate && (
        <Drawer
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          title={`Theme: ${previewTemplate.name}`}
          description={`Category: ${previewTemplate.category}`}
          width="xl"
          footer={
            <div className="flex gap-2 w-full">
              <Button variant="outline" size="sm" onClick={() => setPreviewTemplate(null)} className="flex-1">
                Close Preview
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleApply(previewTemplate)} className="flex-1">
                Apply This Template
              </Button>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">{previewTemplate.name}</h4>
              <p className="text-slate-600 mt-1">{previewTemplate.description}</p>
            </div>

            <div className="space-y-3">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Pre-configured Sections
              </p>
              {[
                { title: 'Hero Banner', desc: 'Full-bleed high-impact typography with primary call to action' },
                { title: 'Featured Products Matrix', desc: 'Real-time sync with inventory prices and stock tags' },
                { title: 'Brand Value Propositions', desc: 'Panama PAC fiscal compliance and fast national delivery badges' },
                { title: 'Customer Testimonial Carousel', desc: 'Social proof from enterprise retail clients' },
                { title: 'Footer & Legal Disclosures', desc: 'Panama DGI RUC, contact info, and social links' }
              ].map((s, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{s.title}</p>
                    <p className="text-slate-500 text-[11px]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      )}
    </AppShell>
  );
}
