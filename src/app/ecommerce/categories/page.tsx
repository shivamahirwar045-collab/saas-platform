'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  Layers,
  ChevronRight,
  Sparkles
} from '@/components/icons';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  productCount: number;
  featured: boolean;
}

export default function EcommerceCategoriesPage() {
  const { products } = useSaaS();
  const { success, info } = useToast();

  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: 'cat_1', name: 'Laptops & Computers', slug: 'laptops-computers', parent: null, productCount: 14, featured: true },
    { id: 'cat_1_1', name: 'Ultrabooks & Thin Laptops', slug: 'ultrabooks', parent: 'Laptops & Computers', productCount: 8, featured: true },
    { id: 'cat_1_2', name: 'Gaming Rigs & Workstations', slug: 'workstations', parent: 'Laptops & Computers', productCount: 6, featured: false },
    { id: 'cat_2', name: 'Audio & Acoustics', slug: 'audio', parent: null, productCount: 12, featured: true },
    { id: 'cat_2_1', name: 'Noise-Cancelling Headphones', slug: 'headphones', parent: 'Audio & Acoustics', productCount: 7, featured: true },
    { id: 'cat_3', name: 'Wearables & Fitness', slug: 'wearables', parent: null, productCount: 9, featured: false },
    { id: 'cat_4', name: 'Displays & Monitors', slug: 'monitors', parent: null, productCount: 5, featured: false }
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatParent, setNewCatParent] = useState('None (Root Category)');
  const [newCatFeatured, setNewCatFeatured] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const item: CategoryItem = {
      id: `cat_${Date.now()}`,
      name: newCatName,
      slug: newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-'),
      parent: newCatParent === 'None (Root Category)' ? null : newCatParent,
      productCount: 0,
      featured: newCatFeatured
    };
    setCategories([...categories, item]);
    setIsAddOpen(false);
    setNewCatName('');
    setNewCatSlug('');
    success('Category Created', `"${item.name}" added to catalog navigation.`);
  };

  const handleDelete = (id: string, name: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    info('Category Deleted', `Removed "${name}" from category tree.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Category Hierarchy Manager</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {categories.length} Categories Defined
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Organize multi-level menus, storefront breadcrumbs, and POS item filtering tabs.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddOpen(true)}
          >
            Add Category
          </Button>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/ecommerce" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/ecommerce/products" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Products
          </Link>
          <Link href="/ecommerce/orders" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Orders
          </Link>
          <Link href="/ecommerce/categories" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Categories
          </Link>
          <Link href="/ecommerce/storefront" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Live Storefront
          </Link>
        </div>

        {/* Categories Tree Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Category Name & Hierarchy</th>
                  <th className="py-3.5 px-4">URL Handle</th>
                  <th className="py-3.5 px-4">Direct Products</th>
                  <th className="py-3.5 px-4">Storefront Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {cat.parent ? (
                          <div className="flex items-center gap-1.5 pl-6 text-slate-400">
                            <span className="text-slate-300">└─</span>
                            <span className="font-semibold text-slate-800">{cat.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
                              <Layers className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-slate-900 text-sm">{cat.name}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      /collections/{cat.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 font-mono">
                        {cat.productCount} SKUs
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {cat.featured ? (
                        <Badge variant="success" size="sm">
                          Featured on Nav
                        </Badge>
                      ) : (
                        <Badge variant="default" size="sm">
                          Standard
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Catalog Category"
        description="Create a root or nested subcategory for your omnichannel catalog."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Save Category
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <Input
            label="Category Name"
            required
            value={newCatName}
            onChange={(e) => {
              setNewCatName(e.target.value);
              setNewCatSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
            }}
            placeholder="e.g. Smart Watches & Bands"
          />

          <Input
            label="URL Handle (Slug)"
            value={newCatSlug}
            onChange={(e) => setNewCatSlug(e.target.value)}
            placeholder="smart-watches"
          />

          <Select
            label="Parent Category"
            value={newCatParent}
            onChange={(e) => setNewCatParent(e.target.value)}
            options={[
              { value: 'None (Root Category)', label: 'None (Root Category)' },
              { value: 'Laptops & Computers', label: 'Laptops & Computers' },
              { value: 'Audio & Acoustics', label: 'Audio & Acoustics' },
              { value: 'Wearables & Fitness', label: 'Wearables & Fitness' }
            ]}
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={newCatFeatured}
              onChange={(e) => setNewCatFeatured(e.target.checked)}
              className="rounded text-blue-600"
            />
            <label htmlFor="featured" className="font-semibold text-slate-700">
              Pin to Storefront Top Header Navigation
            </label>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
