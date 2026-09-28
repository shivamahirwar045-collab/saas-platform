'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Tabs } from '@/components/ui/Tabs';
import { useToast } from '@/components/ui/Toast';
import {
  Package,
  ArrowRight,
  ChevronLeft,
  Barcode,
  Sparkles,
  Upload,
  CheckCircle,
  Plus,
  Trash2,
  Globe,
  Monitor
} from '@/components/icons';

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct, currentBusiness } = useSaaS();
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState('basic');

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Laptops & Computers');
  const [sku, setSku] = useState('SKU-' + Math.floor(1000 + Math.random() * 9000));
  const [barcode, setBarcode] = useState('745' + Math.floor(100000000 + Math.random() * 900000000));
  const [price, setPrice] = useState('499.00');
  const [costPrice, setCostPrice] = useState('320.00');
  const [compareAtPrice, setCompareAtPrice] = useState('599.00');
  const [stock, setStock] = useState('25');
  const [minStockAlert, setMinStockAlert] = useState('5');
  const [description, setDescription] = useState('');
  const [itbmsTax, setItbmsTax] = useState(true); // Panama 7% tax

  // Channels
  const [channels, setChannels] = useState({
    web: true,
    pos: true,
    whatsapp: true,
    b2b: false
  });

  // Variants
  const [variants, setVariants] = useState([
    { id: '1', name: 'Color', value: 'Midnight Black', extraPrice: 0, stock: 15 },
    { id: '2', name: 'Color', value: 'Silver Titanium', extraPrice: 20, stock: 10 }
  ]);

  const handleAiCopy = () => {
    info('AI Assistant drafting...', 'Generating SEO description and technical highlights.');
    setTimeout(() => {
      setDescription(
        `Engineered for ultimate business agility, the ${name || 'Enterprise Device'} combines flagship processing speed, aerospace-grade thermal efficiency, and all-day battery endurance. Includes official manufacturer warranty and Panama DGI fiscal tax breakdown.`
      );
      success('AI Copy Generated', 'Product description written with conversion-focused tone.');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Please provide a product title');
      return;
    }

    const newProduct = {
      id: `prod_${Date.now()}`,
      businessId: currentBusiness.id,
      name,
      category,
      sku,
      barcode,
      price: parseFloat(price) || 0,
      costPrice: parseFloat(costPrice) || 0,
      compareAtPrice: parseFloat(compareAtPrice) || undefined,
      stock: parseInt(stock, 10) || 0,
      minStockAlert: parseInt(minStockAlert, 10) || 5,
      channels: ['ecommerce', 'pos'] as any,
      rating: 5.0,
      reviewsCount: 1
    };

    addProduct(newProduct);
    success('Product Added to Catalog', `"${name}" is now available in Web Store and POS.`);
    router.push('/ecommerce/products');
  };

  const tabsList = [
    { id: 'basic', label: '1. Basic Info' },
    { id: 'pricing', label: '2. Pricing & Tax' },
    { id: 'inventory', label: '3. Inventory & Barcode' },
    { id: 'variants', label: '4. Variants' },
    { id: 'channels', label: '5. Sales Channels' },
    { id: 'seo', label: '6. SEO & Meta' }
  ];

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/ecommerce/products"
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create New Product</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure specs, prices, barcodes, and multi-channel publication.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/ecommerce/products">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </Link>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              Publish Product
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white px-4 rounded-xl border border-slate-200/80">
          <Tabs
            tabs={tabsList}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
          />
        </div>

        {/* Form Body */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Product Specifications</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-blue-600" />}
                  onClick={handleAiCopy}
                >
                  AI Product Writer
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Product Title"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. UltraBook Pro X1 Carbon 14”"
                />

                <Select
                  label="Primary Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={[
                    { value: 'Laptops & Computers', label: 'Laptops & Computers' },
                    { value: 'Audio & Acoustics', label: 'Audio & Acoustics' },
                    { value: 'Wearables & Fitness', label: 'Wearables & Fitness' },
                    { value: 'Displays & Monitors', label: 'Displays & Monitors' },
                    { value: 'Accessories', label: 'Accessories' }
                  ]}
                />
              </div>

              <div>
                <Textarea
                  label="Product Description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide features, technical specifications, and box contents..."
                />
              </div>

              {/* Image Upload Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Product Gallery Images
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">Drag images here or click to browse</p>
                  <p className="text-[11px] text-slate-400 mt-1">Supports PNG, JPG, WebP up to 10MB each</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & TAX */}
          {activeTab === 'pricing' && (
            <div className="space-y-5">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                Pricing & Margin Calculation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Selling Price ($ USD)"
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <Input
                  label="Compare At / Was Price ($ USD)"
                  type="number"
                  step="0.01"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                  helperText="Displays strikethrough discount"
                />

                <Input
                  label="Unit Cost ($ USD)"
                  type="number"
                  step="0.01"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  helperText="Used for gross margin analytics"
                />
              </div>

              {/* Margin Preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Gross Margin per Unit:</span>
                  <span className="font-bold text-emerald-600 font-mono text-sm ml-2">
                    ${(parseFloat(price) - parseFloat(costPrice)).toFixed(2)} (
                    {Math.round(((parseFloat(price) - parseFloat(costPrice)) / (parseFloat(price) || 1)) * 100)}%
                    Profit)
                  </span>
                </div>
              </div>

              {/* Panama Fiscal ITBMS */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="itbms"
                  checked={itbmsTax}
                  onChange={(e) => setItbmsTax(e.target.checked)}
                  className="mt-1 rounded text-blue-600"
                />
                <label htmlFor="itbms" className="text-xs text-slate-700">
                  <span className="font-bold text-slate-900">Apply Panama 7% ITBMS Fiscal Tax</span>
                  <p className="text-slate-500 mt-0.5">
                    Automatically computes 7% ITBMS breakdown on Panama PAC Factura Electrónica receipts.
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY & BARCODE */}
          {activeTab === 'inventory' && (
            <div className="space-y-5">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                Inventory Stock & Barcodes
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Stock Keeping Unit (SKU)"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-700">Barcode / EAN-13</label>
                    <button
                      type="button"
                      onClick={() => setBarcode('745' + Math.floor(100000000 + Math.random() * 900000000))}
                      className="text-[11px] font-semibold text-blue-600 hover:underline"
                    >
                      Generate Barcode
                    </button>
                  </div>
                  <Input
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    leftIcon={<Barcode className="w-4 h-4 text-slate-400" />}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Initial Available Stock Units"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />

                <Input
                  label="Low Stock Safety Buffer Alert"
                  type="number"
                  value={minStockAlert}
                  onChange={(e) => setMinStockAlert(e.target.value)}
                  helperText="Triggers dashboard warning when stock dips below this threshold"
                />
              </div>
            </div>
          )}

          {/* TAB 4: VARIANTS */}
          {activeTab === 'variants' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Product Variants (Sizes, Colors, Storage)</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() =>
                    setVariants([
                      ...variants,
                      { id: `${Date.now()}`, name: 'Storage', value: '512GB SSD', extraPrice: 80, stock: 10 }
                    ])
                  }
                >
                  Add Option
                </Button>
              </div>

              <div className="space-y-3">
                {variants.map((v, i) => (
                  <div
                    key={v.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs"
                  >
                    <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => {
                          const updated = [...variants];
                          updated[i].name = e.target.value;
                          setVariants(updated);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        placeholder="Option Name"
                      />
                      <input
                        type="text"
                        value={v.value}
                        onChange={(e) => {
                          const updated = [...variants];
                          updated[i].value = e.target.value;
                          setVariants(updated);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        placeholder="Option Value"
                      />
                      <input
                        type="number"
                        value={v.stock}
                        onChange={(e) => {
                          const updated = [...variants];
                          updated[i].stock = parseInt(e.target.value, 10) || 0;
                          setVariants(updated);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        placeholder="Stock"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setVariants(variants.filter((item) => item.id !== v.id))}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHANNELS */}
          {activeTab === 'channels' && (
            <div className="space-y-5">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                Omnichannel Publication Availability
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { key: 'web', title: 'Online Storefront & Mobile Web', desc: 'Available for instant checkout on public website' },
                  { key: 'pos', title: 'Cloud POS Cash Registers', desc: 'Available for cashiers at physical branch terminals' },
                  { key: 'whatsapp', title: 'WhatsApp Quick Payment Links', desc: 'Enable single-tap payment link generation for chat agents' },
                  { key: 'b2b', title: 'B2B Wholesale Portal', desc: 'Expose to bulk invoice ordering accounts' }
                ].map((ch) => (
                  <div key={ch.key} className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={ch.key}
                      checked={(channels as any)[ch.key]}
                      onChange={(e) => setChannels({ ...channels, [ch.key]: e.target.checked })}
                      className="mt-1 rounded text-blue-600"
                    />
                    <label htmlFor={ch.key} className="cursor-pointer">
                      <p className="font-bold text-slate-900">{ch.title}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{ch.desc}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-5">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                Product Search Engine Preview
              </h3>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                <p className="font-mono text-[11px] text-slate-400">https://store.panamatech.pa/products/{name ? name.toLowerCase().replace(/\s+/g, '-') : 'product-handle'}</p>
                <h4 className="text-base text-blue-800 font-semibold">{name || 'Product Title'} | Panama Tech Store</h4>
                <p className="text-slate-600">{description || 'Product meta description will automatically populate here.'}</p>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link href="/ecommerce/products">
              <Button type="button" variant="outline" size="sm">
                Discard
              </Button>
            </Link>

            <Button type="button" variant="primary" size="md" onClick={handleSubmit}>
              Save & Add to Catalog →
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
