'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import {
  Globe,
  CheckCircle,
  Eye,
  Sparkles,
  ExternalLink,
  Copy,
  RefreshCw
} from '@/components/icons';

export default function WebsiteSeoPage() {
  const { success, info } = useToast();

  const [metaTitle, setMetaTitle] = useState('Panama Tech Store | Premium Electronics, Laptops & Audio');
  const [metaDescription, setMetaDescription] = useState('Official online distributor for UltraBook Pro, AcousticPure audio, and smart wearable tech with express delivery across Panama and DGI PAC fiscal invoices.');
  const [keywords, setKeywords] = useState('panama laptops, electronics panama, fiscal invoice ecommerce, dgi pac tienda');
  const [ogImageUrl, setOgImageUrl] = useState('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop');
  const [robotsTxt, setRobotsTxt] = useState(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /pos/\n\nSitemap: https://store.panamatech.pa/sitemap.xml`);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('SEO Settings Saved', 'Meta tags, OpenGraph cards, and robots.txt have been synchronized.');
  };

  const handleAiOptimize = () => {
    info('AI Optimizing...', 'Generating high-CTR meta tags based on your product catalog velocity.');
    setTimeout(() => {
      setMetaTitle('Panama Tech Store | Official UltraBook & Smart Tech (Fast Delivery)');
      setMetaDescription('Shop Panama’s top-rated tech store with express nationwide shipping, 1-year official manufacturer warranty, and instant DGI electronic fiscal facturas.');
      success('SEO Tags Enhanced', 'Generated high-ranking titles and descriptions with 96% SEO score.');
    }, 700);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Search Engine Optimization (SEO) & Social Cards</h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Score: 96/100
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Configure search crawler directives, OpenGraph social share previews, and automated XML sitemaps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-blue-600" />}
              onClick={handleAiOptimize}
            >
              AI SEO Optimizer
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/website" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Visual Editor
          </Link>
          <Link href="/website/pages" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            All Pages
          </Link>
          <Link href="/website/templates" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Templates
          </Link>
          <Link href="/website/seo" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            SEO & Social Cards
          </Link>
          <Link href="/website/domains" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Domains & SSL
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Standard Meta Directives
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Input
                  label="Search Title Tag (<title>)"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  helperText={`${metaTitle.length}/60 characters recommended`}
                />
              </div>

              <div>
                <Textarea
                  label="Meta Description (<meta name='description'>)"
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  helperText={`${metaDescription.length}/160 characters recommended`}
                />
              </div>

              <div>
                <Input
                  label="Primary Keywords (comma-separated)"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div>
                <Input
                  label="Social Sharing Image URL (OpenGraph / Twitter Card)"
                  value={ogImageUrl}
                  onChange={(e) => setOgImageUrl(e.target.value)}
                  helperText="Recommended dimension: 1200 x 630 pixels"
                />
              </div>
            </form>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Robots.txt Directive File
              </h4>
              <textarea
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                rows={4}
                className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Live SERP & Social Card Preview */}
          <div className="space-y-6">
            {/* Google Search Result Preview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Google Search Engine Preview
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">Desktop SERP</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">🌐</span>
                  <span className="font-mono text-slate-500">https://store.panamatech.pa</span>
                </div>
                <h5 className="text-base text-blue-800 font-medium hover:underline cursor-pointer leading-snug">
                  {metaTitle || 'Page Title'}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {metaDescription || 'Add a meta description to see how your snippet appears in Google search queries.'}
                </p>
              </div>
            </div>

            {/* Social Share Card (OpenGraph) Preview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  OpenGraph Social Media Card Preview (WhatsApp, LinkedIn, X)
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">1200x630</span>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs bg-slate-50">
                <div
                  className="h-44 bg-cover bg-center bg-slate-200"
                  style={{ backgroundImage: `url(${ogImageUrl})` }}
                />
                <div className="p-3.5 bg-white space-y-1">
                  <p className="text-[10px] uppercase font-mono text-slate-400">STORE.PANAMATECH.PA</p>
                  <p className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">{metaTitle}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{metaDescription}</p>
                </div>
              </div>
            </div>

            {/* XML Sitemap Status */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Automated XML Sitemap Live
                </p>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">https://store.panamatech.pa/sitemap.xml</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => success('Sitemap Rebuilt', 'Dispatched ping to Google and Bing crawler bots.')}
              >
                Ping Crawlers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
