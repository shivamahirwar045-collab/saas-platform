'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Product, Order } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  ShoppingCart,
  Package,
  Plus,
  Search,
  Filter,
  Eye,
  Check,
  X,
  CreditCard,
  Truck,
  Receipt,
  Sparkles,
  ArrowRight,
  Trash2
} from '@/components/icons';

export default function EcommercePage() {
  const { products, addProduct, orders, updateOrderStatus, currentBusiness } = useSaaS();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'storefront' | 'coupons'>('products');

  // Selected Order for Drawer
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Add Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Laptops & Computers',
    price: 99.00,
    compareAtPrice: 120.00,
    sku: 'SKU-' + Math.floor(1000 + Math.random() * 9000),
    stock: 20,
    minStockAlert: 5,
    description: ''
  });

  // Storefront Simulation State
  const [storeCart, setStoreCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isStoreCartOpen, setIsStoreCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<Order | null>(null);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;
    addProduct({
      businessId: 'biz_01',
      name: productForm.name,
      description: productForm.description || 'Enterprise grade certified equipment',
      category: productForm.category,
      price: Number(productForm.price),
      compareAtPrice: Number(productForm.compareAtPrice),
      sku: productForm.sku,
      barcode: '745' + Math.floor(1000000000 + Math.random() * 9000000000),
      stock: Number(productForm.stock),
      minStockAlert: Number(productForm.minStockAlert),
      status: 'active',
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
      channels: ['website', 'pos', 'whatsapp'],
      variants: []
    });
    setIsAddProductOpen(false);
  };

  // Storefront cart handlers
  const addToStoreCart = (product: Product) => {
    setStoreCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsStoreCartOpen(true);
  };

  const handleCompleteCheckout = () => {
    const subtotal = storeCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: 'cust_01',
      customerName: 'Online Web Customer',
      customerEmail: 'customer@store.pa',
      channel: 'Website',
      branchName: 'Main Flagship Store (Calle 50)',
      items: storeCart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity
      })),
      subtotal,
      tax,
      discount: 0,
      total,
      status: 'Received',
      paymentStatus: 'Paid',
      fiscalStatus: 'Authorized',
      cufe: `CUFE-PA-000101-${Date.now()}`,
      createdAt: 'Just now'
    };

    setCheckoutSuccess(newOrder);
    setStoreCart([]);
    setIsCheckoutOpen(false);
  };

  // Products Table Columns
  const productColumns: Column<Product>[] = [
    {
      header: 'Product',
      cell: (p) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.images[0]} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
          <div>
            <p className="font-bold text-slate-900 leading-tight">{p.name}</p>
            <p className="text-[11px] text-slate-400 font-mono">SKU: {p.sku}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    {
      header: 'Price',
      cell: (p) => (
        <div>
          <span className="font-bold text-slate-900">${p.price.toFixed(2)}</span>
          {p.compareAtPrice && (
            <span className="text-[10px] text-slate-400 line-through ml-1.5">
              ${p.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Stock Level',
      cell: (p) => (
        <div className="flex items-center gap-2">
          <span className={`font-bold ${p.stock <= p.minStockAlert ? 'text-rose-600' : 'text-slate-800'}`}>
            {p.stock} units
          </span>
          {p.stock <= p.minStockAlert && (
            <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">
              Low Stock
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Channels',
      cell: (p) => (
        <div className="flex gap-1">
          {p.channels.map(c => (
            <span key={c} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono uppercase">
              {c}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Status',
      cell: (p) => (
        <Badge variant={p.status === 'active' ? 'success' : 'default'}>
          {p.status}
        </Badge>
      )
    }
  ];

  // Orders Table Columns
  const orderColumns: Column<Order>[] = [
    {
      header: 'Order #',
      cell: (o) => <span className="font-bold text-slate-900">{o.orderNumber}</span>
    },
    {
      header: 'Customer',
      cell: (o) => (
        <div>
          <p className="font-semibold text-slate-800">{o.customerName}</p>
          <p className="text-[10px] text-slate-400">{o.customerEmail}</p>
        </div>
      )
    },
    {
      header: 'Channel',
      accessorKey: 'channel'
    },
    {
      header: 'Total',
      cell: (o) => <span className="font-bold text-slate-900">${o.total.toFixed(2)}</span>
    },
    {
      header: 'Fulfillment',
      cell: (o) => (
        <Badge
          variant={
            o.status === 'Delivered'
              ? 'success'
              : o.status === 'Out for Delivery'
              ? 'info'
              : o.status === 'Prepared'
              ? 'purple'
              : 'warning'
          }
        >
          {o.status}
        </Badge>
      )
    },
    {
      header: 'Panama PAC',
      cell: (o) => (
        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {o.fiscalStatus}
        </span>
      )
    },
    {
      header: 'Action',
      cell: (o) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedOrder(o);
          }}
          className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
        >
          View Details
        </button>
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
              Ecommerce &amp; Order Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Multi-channel catalog, automated stock reconciliation, customer orders, and customer storefront preview.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Online Store Revenue"
            value="$98,450"
            change="14.2%"
            isPositive={true}
            subtitle="Website channel only"
            icon={<CreditCard className="w-5 h-5" />}
          />
          <StatCard
            title="Total Active Orders"
            value={orders.length}
            subtitle="Across web &amp; payment links"
            icon={<ShoppingCart className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Catalog SKUs"
            value={products.length}
            subtitle="Synchronized with POS"
            icon={<Package className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Avg. Order Value"
            value="$684.50"
            change="6.1%"
            isPositive={true}
            subtitle="High-ticket tech &amp; audio"
            icon={<Receipt className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'products' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" /> Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'orders' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <ShoppingCart className="w-4 h-4" /> Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('storefront')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'storefront' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" /> Live Storefront Preview &amp; Checkout
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'coupons' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Discounts &amp; Coupons (3)
          </button>
        </div>

        {/* TAB 1: PRODUCTS TABLE */}
        {activeTab === 'products' && (
          <DataTable
            data={products}
            columns={productColumns}
            searchPlaceholder="Search product by name, SKU or category..."
            title="Active Catalog Items"
            subtitle="Click on any product to view warehouse distribution"
          />
        )}

        {/* TAB 2: ORDERS TABLE */}
        {activeTab === 'orders' && (
          <DataTable
            data={orders}
            columns={orderColumns}
            searchPlaceholder="Search orders by number or customer..."
            title="Omnichannel Order History"
            subtitle="Panama PAC fiscal status and delivery progress"
            onRowClick={(order) => setSelectedOrder(order)}
          />
        )}

        {/* TAB 3: STOREFRONT PREVIEW */}
        {activeTab === 'storefront' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200/80 p-4 rounded-xl flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span>
                  This interactive storefront allows testing public catalog shopping, cart persistence, and simulated checkout.
                </span>
              </div>
              <button
                onClick={() => setIsStoreCartOpen(true)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Cart ({storeCart.reduce((s, i) => s + i.quantity, 0)})
              </button>
            </div>

            {/* Storefront Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-44 object-cover" />
                    <span className="absolute top-2 right-2 text-[10px] font-bold bg-white/90 backdrop-blur-xs text-slate-800 px-2 py-0.5 rounded-full shadow">
                      {prod.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{prod.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{prod.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-slate-900">${prod.price.toFixed(2)}</span>
                        {prod.compareAtPrice && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            ${prod.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToStoreCart(prod)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Promotions, Coupons &amp; Gift Cards</h3>
                <p className="text-slate-500">Configure checkout discounts and VIP reward incentives</p>
              </div>
              <button
                onClick={() => alert('New coupon created: BLACKNOV20 (20% Off)')}
                className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl font-semibold"
              >
                + Create Coupon
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { code: 'VIP-CLIENT-50', discount: '$50.00 Off', uses: '42 / 100', status: 'Active' },
                { code: 'FLASH10', discount: '10% Storewide', uses: '142 / 500', status: 'Active' },
                { code: 'TECHPANAMA', discount: '10% Referral', uses: '148 / Unlimited', status: 'Active (Affiliate)' }
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-xl border border-dashed border-blue-300 bg-blue-50/40 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm font-extrabold text-blue-700">{c.code}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                      {c.status}
                    </span>
                  </div>
                  <p className="font-bold text-slate-800 text-xs">{c.discount}</p>
                  <p className="text-[11px] text-slate-500">Redemptions: {c.uses}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: ADD PRODUCT */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Add New Catalog Product</h3>
                <button onClick={() => setIsAddProductOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4K Pro WebCam"
                    value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Price ($ USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={productForm.price}
                      onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Compare-at Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.compareAtPrice}
                      onChange={e => setProductForm({ ...productForm, compareAtPrice: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">SKU Code</label>
                    <input
                      type="text"
                      value={productForm.sku}
                      onChange={e => setProductForm({ ...productForm, sku: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Stock Units</label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={e => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  >
                    <option value="Laptops & Computers">Laptops &amp; Computers</option>
                    <option value="Audio & Accessories">Audio &amp; Accessories</option>
                    <option value="Wearables & Health">Wearables &amp; Health</option>
                    <option value="Office Furniture">Office Furniture</option>
                    <option value="POS Hardware">POS Hardware</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-semibold shadow-xs"
                  >
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DRAWER: ORDER DETAILS */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200 overflow-y-auto">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedOrder.orderNumber}</h3>
                    <p className="text-xs text-slate-400">{selectedOrder.createdAt} • Channel: {selectedOrder.channel}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Customer Details */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer</span>
                  <p className="font-bold text-slate-800">{selectedOrder.customerName}</p>
                  <p className="text-slate-500">{selectedOrder.customerEmail}</p>
                  <p className="text-slate-500">Fulfillment Branch: {selectedOrder.branchName}</p>
                </div>

                {/* Fiscal PAC Status */}
                <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Panama PAC Invoicing</span>
                  <p className="font-bold text-emerald-900">CUFE Authorized (DGI Certified)</p>
                  <p className="font-mono text-[10px] text-emerald-700 truncate">{selectedOrder.cufe || 'Pending generation'}</p>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800">Order Items</span>
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-slate-800">{it.productName}</p>
                        <p className="text-[10px] text-slate-400">Qty: {it.quantity} × ${it.price.toFixed(2)}</p>
                      </div>
                      <span className="font-bold text-slate-900">${it.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-slate-200 pt-3 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>ITBMS Tax (7%):</span>
                    <span>${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-100">
                    <span>Total:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Status Updater */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Update Order Status</label>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Received', 'Prepared', 'Shipped', 'Out for Delivery', 'Delivered'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, st);
                          setSelectedOrder({ ...selectedOrder, status: st });
                        }}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${
                          selectedOrder.status === st
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => alert(`Receipt printed for ${selectedOrder.orderNumber}`)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
                >
                  Print Order &amp; Packing Slip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STOREFRONT CART DRAWER */}
        {isStoreCartOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex justify-end">
            <div className="w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-blue-600" /> Digital Store Cart
                  </h3>
                  <button onClick={() => setIsStoreCartOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {storeCart.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    Your shopping cart is empty. Add products from the storefront preview!
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
                    {storeCart.map(item => (
                      <div key={item.product.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                        <div className="truncate mr-2">
                          <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                          <p className="text-slate-400">${item.product.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">Qty: {item.quantity}</span>
                          <button
                            onClick={() => setStoreCart(prev => prev.filter(p => p.product.id !== item.product.id))}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {storeCart.length > 0 && (
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="flex justify-between text-sm font-bold text-slate-900">
                    <span>Subtotal:</span>
                    <span>
                      ${storeCart.reduce((s, i) => s + i.product.price * i.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsStoreCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                  >
                    Proceed to Simulated Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL: CHECKOUT SIMULATION */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Checkout Preview</h3>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <p className="font-bold text-slate-800">Order Summary</p>
                  <p className="text-slate-500">Items: {storeCart.reduce((s, i) => s + i.quantity, 0)}</p>
                  <p className="font-bold text-slate-900">
                    Total with ITBMS 7%: $
                    {(storeCart.reduce((s, i) => s + i.product.price * i.quantity, 0) * 1.07).toFixed(2)}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Simulated Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" className="p-2.5 border-2 border-blue-600 bg-blue-50 text-blue-700 rounded-xl font-bold text-center">
                      💳 Credit Card
                    </button>
                    <button type="button" className="p-2.5 border border-slate-200 bg-white text-slate-700 rounded-xl font-semibold text-center">
                      📱 Yappy Panama
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px]">
                  ✓ DGI Panama PAC Fiscal Invoicing will be triggered automatically upon payment confirmation.
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteCheckout}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Confirm &amp; Place Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CHECKOUT SUCCESS */}
        {checkoutSuccess && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Order Placed Successfully!</h3>
              <p className="text-xs text-slate-500">
                Order <strong className="text-slate-800">{checkoutSuccess.orderNumber}</strong> has been logged to your centralized business operating system.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1 font-mono">
                <p>Status: Paid &amp; In Queue</p>
                <p>Panama PAC CUFE: {checkoutSuccess.cufe}</p>
              </div>
              <button
                onClick={() => setCheckoutSuccess(null)}
                className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
              >
                Back to Ecommerce Hub
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
