'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { mockWebsitePages } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import {
  Globe,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Eye,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ExternalLink
} from '@/components/icons';

export default function WebsitePagesDirectory() {
  const { success, info } = useToast();
  const [pagesList, setPagesList] = useState(mockWebsitePages);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [previewPage, setPreviewPage] = useState<typeof mockWebsitePages[0] | null>(null);

  // New Page Form
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newStatus, setNewStatus] = useState<'Published' | 'Draft'>('Draft');

  const filteredPages = pagesList.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newPage = {
      id: `page_${Date.now()}`,
      title: newTitle || 'Untitled Page',
      slug: newSlug || `page-${Date.now()}`,
      status: newStatus,
      sections: []
    };
    setPagesList([newPage, ...pagesList]);
    setIsCreateOpen(false);
    setNewTitle('');
    setNewSlug('');
    success('Page Created', `"${newPage.title}" has been added to your website pages.`);
  };

  const handleDuplicate = (page: typeof mockWebsitePages[0]) => {
    const copy = {
      ...page,
      id: `page_${Date.now()}`,
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'Draft' as const
    };
    setPagesList([copy, ...pagesList]);
    info('Page Duplicated', `Created draft clone of "${page.title}"`);
  };

  const handleDelete = (id: string) => {
    setPagesList(pagesList.filter((p) => p.id !== id));
    info('Page Removed', 'Page has been deleted from your site architecture.');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Website Pages Directory</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {pagesList.length} Pages Live
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage custom URLs, publishing statuses, SEO slugs, and drag-and-drop page layouts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/website">
              <Button variant="outline" size="sm">
                Visual Builder
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateOpen(true)}
            >
              Create New Page
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/website" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Visual Editor
          </Link>
          <Link href="/website/pages" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            All Pages
          </Link>
          <Link href="/website/templates" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Templates
          </Link>
          <Link href="/website/seo" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            SEO & Social Cards
          </Link>
          <Link href="/website/domains" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Domains & SSL
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/80">
          <input
            type="text"
            placeholder="Search pages by title or slug (e.g. /about, /catalog)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-3.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <span className="text-xs text-slate-400 font-mono">
            Showing {filteredPages.length} of {pagesList.length}
          </span>
        </div>

        {/* Pages Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Page Title & Path</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Sections</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span>{page.title}</span>
                        </p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          https://store.panamatech.pa/{page.slug}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={page.status === 'Published' ? 'success' : 'default'}>
                        {page.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">
                        {page.sections?.length || 0} Blocks
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        {page.slug === '' ? 'Home' : 'Standard'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewPage(page)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Quick Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(page)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Duplicate Page"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <Link
                          href="/website"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Open in Builder"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        {page.slug !== '' && (
                          <button
                            onClick={() => handleDelete(page.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Page Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Website Page"
        description="Add a new custom landing page, about dossier, policy page, or promotion."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Save & Open Editor
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <Input
            label="Page Title"
            required
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
            }}
            placeholder="e.g. VIP Corporate Discounts"
          />

          <Input
            label="URL Slug"
            required
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="e.g. corporate-discounts"
            helperText="The page will be live at: https://store.panamatech.pa/{slug}"
          />

          <Select
            label="Publishing Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as any)}
            options={[
              { value: 'Draft', label: 'Draft (Visible only to team)' },
              { value: 'Published', label: 'Published (Publicly live)' }
            ]}
          />
        </form>
      </Modal>

      {/* Quick Preview Modal */}
      {previewPage && (
        <Modal
          isOpen={!!previewPage}
          onClose={() => setPreviewPage(null)}
          title={`Preview: ${previewPage.title}`}
          description={`Simulated desktop render of /${previewPage.slug}`}
          maxWidth="4xl"
          footer={
            <Button variant="primary" size="sm" onClick={() => setPreviewPage(null)}>
              Close Preview
            </Button>
          }
        >
          <div className="p-6 bg-slate-900 text-white rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-mono text-emerald-400">STATUS: {previewPage.status.toUpperCase()}</span>
              <span className="font-mono text-slate-400">{previewPage.sections?.length || 0} Sections Loaded</span>
            </div>
            <div className="py-8 text-center space-y-3">
              <h2 className="text-2xl font-bold">{previewPage.title}</h2>
              <p className="text-slate-300 text-xs max-w-md mx-auto">
                Clean, high-performance responsive page rendered with next-gen Next.js SSR and automated SEO meta tags.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <span className="text-xs px-3 py-1 rounded bg-blue-600 font-semibold">Hero Active</span>
                <span className="text-xs px-3 py-1 rounded bg-slate-800 font-semibold">Catalog Grid</span>
                <span className="text-xs px-3 py-1 rounded bg-slate-800 font-semibold">Contact Form</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
