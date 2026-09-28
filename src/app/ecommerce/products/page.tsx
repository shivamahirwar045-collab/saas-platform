'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Product } from '@/types/saas';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Barcode,
  ArrowRight,
  Sparkles,
  Download,
  CheckCircle
} from '@/components/icons';

export default function EcommerceProductsDirectory() {
  const { products, setProducts } = useSaaS();
  const { success, info } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'instock'>('all');

  // Bulk Edit Modal
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [bulkAdjustmentPercent, setBulkAdjustmentPercent] = useState('5');
  const [bulkAdjustmentType, setBulkAdjustmentType] = useState<'increase' | 'decrease'>('increase');

  // Filter products
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.barcode && p.barcode.includes(searchTerm));
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStock =
      stockFilter === 'all'
        ? true
        : stockFilter === 'low'
        ? p.stock <= p.minStockAlert
        : p.stock > p.minStockAlert;
    return matchesSearch && matchesCat && matchesStock;
  });

  const handleBulkPriceAdjustment = () => {
    const percent = parseFloat(bulkAdjustmentPercent) || 0;
    const factor = bulkAdjustmentType === 'increase' ? 1 + percent / 100 : 1 - percent / 100;

    const updated = products.map((p) => ({
      ...p,
      price: Math.round(p.price * factor * 100) / 100
    }));

    setProducts(updated);
    setIsBulkEditOpen(false);
    success(
      'Bulk Prices Updated',
      `Applied ${bulkAdjustmentPercent}% ${bulkAdjustmentType} across all catalog items.`
    );
  };

  const handleDelete = (id: string, name: string) => {
    setProducts(products.filter((p) => p.id !== id));
    info('Product Removed', `"${name}" has been removed from catalog.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Products Catalog</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {products.length} Items Total
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Synchronized across online storefront, cloud POS registers, and multi-warehouse bins.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBulkEditOpen(true)}
            >
              Bulk Price Adjust
            </Button>
            <Link href="/ecommerce/products/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Add New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/ecommerce" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/ecommerce/products" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Products
          </Link>
          <Link href="/ecommerce/orders" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Orders
          </Link>
          <Link href="/ecommerce/categories" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Categories
          </Link>
          <Link href="/ecommerce/storefront" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Live Storefront
          </Link>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by SKU, name or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-700"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-700"
            >
              <option value="all">Stock: All Units</option>
              <option value="low">Stock: Low Buffer Alert</option>
              <option value="instock">Stock: In Stock Only</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Item Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock Buffer</th>
                  <th className="py-3.5 px-4">Channels</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredProducts.map((product) => {
                  const isLow = product.stock <= product.minStockAlert;
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-snug">
                              {product.name}
                            </p>
                            <p className="text-[11px] font-mono text-slate-400 mt-0.5 flex items-center gap-2">
                              <span>SKU: {product.sku}</span>
                              {product.barcode && (
                                <span className="flex items-center gap-1 text-slate-500">
                                  <Barcode className="w-3 h-3" /> {product.barcode}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700">{product.category}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900 text-sm font-mono">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.compareAtPrice && (
                          <p className="text-[11px] text-slate-400 line-through font-mono">
                            ${product.compareAtPrice.toFixed(2)}
                          </p>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold font-mono ${isLow ? 'text-rose-600' : 'text-slate-900'}`}>
                            {product.stock} Units
                          </span>
                          {isLow && (
                            <Badge variant="danger" size="sm">
                              Low Stock (&lt;{product.minStockAlert})
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-[10px] text-slate-600 font-semibold">
                          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded">
                            Web
                          </span>
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded">
                            POS
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href="/ecommerce/products/new"
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bulk Price Adjustment Modal */}
      <Modal
        isOpen={isBulkEditOpen}
        onClose={() => setIsBulkEditOpen(false)}
        title="Bulk Catalog Price Adjustment"
        description="Quickly apply an inflation, currency, or seasonal price adjustment across all products."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsBulkEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleBulkPriceAdjustment}>
              Confirm Bulk Update
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Adjustment Direction</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBulkAdjustmentType('increase')}
                className={`p-2.5 rounded-xl border text-center font-bold ${
                  bulkAdjustmentType === 'increase'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Increase Prices (+)
              </button>
              <button
                type="button"
                onClick={() => setBulkAdjustmentType('decrease')}
                className={`p-2.5 rounded-xl border text-center font-bold ${
                  bulkAdjustmentType === 'decrease'
                    ? 'border-rose-600 bg-rose-50 text-rose-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                Decrease / Discount (-)
              </button>
            </div>
          </div>

          <Input
            label="Percentage Value (%)"
            type="number"
            value={bulkAdjustmentPercent}
            onChange={(e) => setBulkAdjustmentPercent(e.target.value)}
            helperText="Example: 5 for 5% markup"
          />
        </div>
      </Modal>
    </AppShell>
  );
}
